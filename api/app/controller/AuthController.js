/* eslint-disable consistent-return */

'use strict';

//* * packages */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//* * Model */
const UserModel = require('../model/User.Model');

//* * Utils and utils */
const { sendEmail } = require('../library/EmailLibrary');
const jwtLibrary = require('../library/jwtLib');
const ErrorResponse = require('../utils/errorResponse');

const { userSignupSchema, userSignInSchema } = require('../utils/validator/user');

const signUp = async (req, res, next) => {
  try {
    // Form validation using Joi or similar
    const { error, value } = userSignupSchema.validate(req.body);
    if (error) {
      return new ErrorResponse(error.details[0].message, 400);
    }
    const { firstName, lastName, email, password } = value;

    // Check for existing user
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      throw new ErrorResponse('Email already registered', 409);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create unverified user
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verified: false,
    });

    // Generate verification token
    const verificationToken = jwt.sign({ userId: user.id }, process.env.JWT_VERIFICATION_SECRET, {
      expiresIn: '24h',
    });

    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    await sendEmail({
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <p>Hello ${firstName},</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: 'Verification email sent. Please check your inbox.',
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { error, value } = userSignInSchema.validate(req.body);
    if (error) return next(new ErrorResponse(error, 400));
    const { email, password } = value;

    if (!email || !password) {
      return next(new ErrorResponse('Please enter valid email and password.', 400));
    }

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return next(new ErrorResponse('Invalid email and password.', 401));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return next(new ErrorResponse('Invalid email and password.', 401));
    }

    // IF 2FA is disable
    //* * JWT Token */
    const objJwt = { id: user.id, email: user.vEmail };
    const accessToken = jwtLibrary.jwtSign(objJwt, 'Access Token');

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      AccessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const decoded = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET);
    const user = await UserModel.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.verified) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    res.status(400).json({
      error: 'Invalid or expired verification link',
    });
  }
};

module.exports = {
  signUp,
  signIn,
  verifyEmail,
};

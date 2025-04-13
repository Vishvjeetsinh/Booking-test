import { z } from "zod";

const passwordValidation = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character");

export const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: passwordValidation,
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const bookingFormSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  bookingDate: z.date({
    required_error: "Booking date is required",
  }),
  bookingType: z.enum(["full_day", "half_day", "custom"], {
    required_error: "Please select a booking type",
  }),
  slot: z.enum(["first_half", "second_half"]).optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.bookingType === 'half_day' && !data.slot) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['slot'],
      message: 'Slot is required for half day bookings',
    });
  }
  if (data.bookingType === 'custom') {
    if (!data.startTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['startTime'],
        message: 'Start time is required',
      });
    }
    if (!data.endTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endTime'],
        message: 'End time is required',
      });
    }
    if (data.startTime && data.endTime && data.startTime >= data.endTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endTime'],
        message: 'End time must be after start time',
      });
    }
  }
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type BookingFormData = z.infer<typeof bookingFormSchema>;
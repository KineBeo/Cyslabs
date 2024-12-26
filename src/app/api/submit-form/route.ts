import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Define interface for form data
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

// Validate form data
const validateFormData = (data: FormData): string | null => {
  if (!data.firstname || !data.lastname || !data.email || !data.phone) {
    return "All fields are required";
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return "Invalid email format";
  }

  // Basic phone validation
  const phoneRegex = /^\+?[\d\s-]{8,}$/;
  if (!phoneRegex.test(data.phone)) {
    return "Invalid phone number format";
  }

  return null;
};

export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json();

    // Validate form data
    const validationError = validateFormData(formData);
    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    // Verify environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error("Missing email configuration");
    }

    const { firstname, lastname, email, phone } = formData;

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Sanitize and format email content
    const sanitizedFirstName = firstname.replace(/[<>]/g, "");
    const sanitizedLastName = lastname.replace(/[<>]/g, "");
    const sanitizedEmail = email.replace(/[<>]/g, "");
    const sanitizedPhone = phone.replace(/[<>]/g, "");

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || "22028118@vnu.edu.vn",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedFirstName} ${sanitizedLastName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Phone:</strong> ${sanitizedPhone}</p>
        <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error submitting form";

    return NextResponse.json(
      { message: "Error submitting form", error: errorMessage },
      { status: 500 }
    );
  }
}

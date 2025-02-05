import { mailService } from "@/src/service/email/mailer";
import { generateContactEmail } from "@/src/templates/contactEmail";
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

    const emailTemplate = generateContactEmail(formData);

    // Send email
    await mailService.sendMail(
      process.env.CONTACT_EMAIL || "22028118@vnu.edu.vn",
      emailTemplate
    );

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

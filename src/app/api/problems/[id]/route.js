import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Problem from "@/models/Problem";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const problem = mongoose.Types.ObjectId.isValid(id)
      ? await Problem.findById(id).lean()
      : null;

    if (!problem) {
      return NextResponse.json(
        {
          success: false,
          message: "Problem not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: problem,
    });
  } catch (error) {
    console.error("GET problem error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch problem",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid problem ID",
        },
        {
          status: 400,
        }
      );
    }

    const problem = await Problem.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!problem) {
      return NextResponse.json(
        {
          success: false,
          message: "Problem not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Problem updated successfully",
      data: problem,
    });
  } catch (error) {
    console.error("PATCH problem error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update problem",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid problem ID",
        },
        {
          status: 400,
        }
      );
    }

    const problem = await Problem.findByIdAndDelete(id);

    if (!problem) {
      return NextResponse.json(
        {
          success: false,
          message: "Problem not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    console.error("DELETE problem error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete problem",
      },
      {
        status: 500,
      }
    );
  }
}
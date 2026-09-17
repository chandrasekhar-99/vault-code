import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Problem from "@/models/Problem";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q")?.trim() || "";

    if (!query) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const searchRegex = new RegExp(query, "i");

    const problems = await Problem.find({
      $or: [
        { title: searchRegex },
        { topics: searchRegex },
        { companies: searchRegex },
        { "solutions.language": searchRegex },
      ],
    })
      .select("title topics companies solutions.language")
      .limit(20)
      .lean();

    const suggestions = [];
    const seen = new Set();

    for (const problem of problems) {
      const values = [
        problem.title,
        ...(problem.topics || []),
        ...(problem.companies || []),
        ...(problem.solutions || []).map(
          (solution) => solution.language
        ),
      ];

      for (const value of values) {
        if (!value) continue;

        if (
          searchRegex.test(value) &&
          !seen.has(value.toLowerCase())
        ) {
          seen.add(value.toLowerCase());
          suggestions.push(value);
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: suggestions.slice(0, 8),
    });
  } catch (error) {
    console.error(
      "GET /api/problems/suggestions error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch suggestions",
      },
      {
        status: 500,
      }
    );
  }
}
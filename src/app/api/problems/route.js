import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Problem from "@/models/Problem";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const difficulty = searchParams.get("difficulty") || "";
    const topic = searchParams.get("topic") || "";
    const language = searchParams.get("language") || "";
    const company = searchParams.get("company") || "";
    const sort = searchParams.get("sort") || "newest";

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const filter = {};

    if (search) {
      filter.$text = {
        $search: search,
      };
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (topic) {
      filter.topics = topic;
    }

    if (language) {
      filter["solutions.language"] = language;
    }

    if (company) {
      filter.companies = company;
    }

    let sortOption = {};

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sort === "title-asc") {
      sortOption = { title: 1 };
    } else if (sort === "title-desc") {
      sortOption = { title: -1 };
    } else {
      sortOption = { createdAt: -1 };
    }

    const [problems, total] = await Promise.all([
      Problem.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),

      Problem.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: problems,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/problems error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch problems",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      title,
      slug,
      difficulty,
      description,
      topics,
      companies,
      examples,
      constraints,
      approach,
      timeComplexity,
      spaceComplexity,
      solutions,
    } = body;

    if (
  !title?.trim() ||
  !slug?.trim() ||
  !difficulty?.trim() ||
  !description?.trim()
) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Title, slug, difficulty and description are required",
    },
    { status: 400 }
  );
}

    const existingProblem = await Problem.findOne({ slug });

    if (existingProblem) {
      return NextResponse.json(
        {
          success: false,
          message: "A problem with this slug already exists",
        },
        {
          status: 409,
        }
      );
    }

    const problem = await Problem.create({
      title,
      slug,
      difficulty,
      description,
      topics: topics || [],
      companies: companies || [],
      examples: examples || [],
      constraints: constraints || [],
      approach: approach || "",
      timeComplexity: timeComplexity || "",
      spaceComplexity: spaceComplexity || "",
      solutions: solutions || [],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Problem created successfully",
        data: problem,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/problems error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create problem",
      },
      {
        status: 500,
      }
    );
  }
}
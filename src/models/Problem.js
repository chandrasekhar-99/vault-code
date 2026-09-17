import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
  }
);

const exampleSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },

    output: {
      type: String,
      required: true,
    },

    explanation: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    topics: {
      type: [String],
      default: [],
    },

    companies: {
      type: [String],
      default: [],
    },

    examples: {
      type: [exampleSchema],
      default: [],
    },

    constraints: {
      type: [String],
      default: [],
    },

    approach: {
      type: String,
      default: "",
    },

    timeComplexity: {
      type: String,
      default: "",
    },

    spaceComplexity: {
      type: String,
      default: "",
    },

    solutions: {
      type: [solutionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

problemSchema.index({
  title: "text",
  description: "text",
  topics: "text",
  companies: "text",
});

problemSchema.index({ difficulty: 1 });
problemSchema.index({ topics: 1 });
problemSchema.index({ "solutions.language": 1 });
problemSchema.index({ createdAt: -1 });

const Problem =
  mongoose.models.Problem ||
  mongoose.model("Problem", problemSchema);

export default Problem;
import mongoose, { Schema, model, models } from "mongoose";

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    keyword: { type: String, required: true, unique: true },
    contentHtml: { type: String, required: true },
    metaDescription: { type: String, required: true },
    imageKitUrl: { type: String, default: "" },
    published: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
    strict: true,
  }
);

// Compound index to speed up duplicate checks
BlogPostSchema.index({ slug: 1, keyword: 1 });

const BlogPost = models.BlogPost || model("BlogPost", BlogPostSchema);
export default BlogPost;

export enum FeedbackType {
  BUG = "bug",
  SUGGESTION = "suggestion",
}

export type Feedback = {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  type: FeedbackType;
  title: string;
  message: string;
};

export type UnsavedFeedback = Omit<Feedback, "id" | "createdAt">;

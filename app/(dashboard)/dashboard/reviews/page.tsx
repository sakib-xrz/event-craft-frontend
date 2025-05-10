"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star, Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/formatters";

// Define interfaces for type safety
interface Organizer {
  id: string;
  name: string;
}

interface Event {
  id: string;
  title: string;
  date_time: string;
  organizer: Organizer;
}

interface Review {
  id: string;
  event: Event;
  rating: number;
  comment: string;
  created_at: Date;
  helpful_count: number;
  not_helpful_count: number;
}

interface EditedReview {
  rating: number;
  comment: string;
}

// Mock data for reviews written by the user
const reviews: Review[] = [
  {
    id: "wr1",
    event: {
      id: "3",
      title: "Networking Mixer",
      date_time: "2025-05-25T18:00:00",
      organizer: {
        id: "org1",
        name: "Business Network Group",
      },
    },
    rating: 4,
    comment:
      "Great networking opportunity. Met some interesting people and had good conversations. The venue was nice but a bit crowded.",
    created_at: new Date("2024-05-26"),
    helpful_count: 7,
    not_helpful_count: 1,
  },
  {
    id: "wr2",
    event: {
      id: "4",
      title: "Product Launch Webinar",
      date_time: "2025-04-10T14:00:00",
      organizer: {
        id: "org2",
        name: "Tech Innovations Inc.",
      },
    },
    rating: 5,
    comment:
      "Excellent presentation! The product looks promising and the Q&A session was very informative. Looking forward to trying it out.",
    created_at: new Date("2024-04-11"),
    helpful_count: 10,
    not_helpful_count: 0,
  },
];

export default function ReviewsPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [editedReview, setEditedReview] = useState<EditedReview>({
    rating: 0,
    comment: "",
  });

  // Handle edit review
  const handleEditReview = (review: Review) => {
    setSelectedReview(review);
    setEditedReview({
      rating: review.rating,
      comment: review.comment,
    });
    setIsEditDialogOpen(true);
  };

  // Handle delete review
  const handleDeleteReview = (review: Review) => {
    setSelectedReview(review);
    setIsDeleteDialogOpen(true);
  };

  // Save edited review
  const saveEditedReview = () => {
    // In a real app, you would call an API to update the review
    if (selectedReview) {
      console.log("Saving edited review:", selectedReview.id, editedReview);
    }
    setIsEditDialogOpen(false);
  };

  // Confirm delete review
  const confirmDeleteReview = () => {
    // In a real app, you would call an API to delete the review
    if (selectedReview) {
      console.log("Deleting review:", selectedReview.id);
    }
    setIsDeleteDialogOpen(false);
  };

  // Submit report
  const submitReport = () => {
    // In a real app, you would call an API to report the review
    if (selectedReview) {
      console.log("Reporting review:", selectedReview.id);
    }
    setIsReportDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reviews</h2>
          <p className="text-muted-foreground">
            Manage reviews for your events
          </p>
        </div>
      </div>

      <ReviewsList
        reviews={reviews}
        onEditReview={handleEditReview}
        onDeleteReview={handleDeleteReview}
      />

      {/* Edit Review Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogDescription>
              Update your review for {selectedReview?.event?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Rating</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setEditedReview({ ...editedReview, rating: star })
                    }
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= editedReview.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Review</div>
              <Textarea
                value={editedReview.comment}
                onChange={(e) =>
                  setEditedReview({ ...editedReview, comment: e.target.value })
                }
                className="min-h-[150px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveEditedReview}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Review Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your review for{" "}
              {selectedReview?.event?.title}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteReview}>
              Delete Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Review Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Review</DialogTitle>
            <DialogDescription>
              Please let us know why you&apos;re reporting this review.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Reason for reporting</div>
              <Textarea
                placeholder="Please provide details about why you're reporting this review"
                className="min-h-[150px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReportDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={submitReport}>Submit Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ReviewsListProps {
  reviews: Review[];
  onEditReview: (review: Review) => void;
  onDeleteReview: (review: Review) => void;
}

function ReviewsList({
  reviews,
  onEditReview,
  onDeleteReview,
}: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Edit className="h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No reviews found</h3>
          <p className="text-muted-foreground mt-1">
            You haven&apos;t written any reviews matching your current filters.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/events/${review.event.id}`}
                    className="text-xl font-semibold hover:underline"
                  >
                    {review.event.title}
                  </Link>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Posted on {formatDate(review.created_at.toString())}
                  </span>
                </div>

                <div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 lg:w-48">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="w-full gap-1"
                    onClick={() => onEditReview(review)}
                  >
                    <Edit className="h-4 w-4" />
                    Edit Review
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-1 text-destructive hover:text-destructive"
                    onClick={() => onDeleteReview(review)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Review
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FREE = "FREE",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum InvitationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export interface IUser {
  id: string;
  full_name: string;
  email: string;
  password: string;
  role: Role;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  date_time: string;
  venue: string;
  is_featured: boolean;
  is_public: boolean;
  is_paid: boolean;
  is_virtual: boolean;
  registration_fee: number;
  organizer: {
    full_name: string;
  };
}

export interface IParticipant {
  id: string;
  event_id: string;
  user_id: string;
  payment_status: PaymentStatus;
  approval_status: ApprovalStatus;
  is_banned: boolean;
  joined_at: string;
  user?: IUser;
  event?: IEvent;
}

export interface IInvitation {
  id: string;
  event_id: string;
  sender_id: string;
  receiver_id: string;
  is_paid_event: boolean;
  payment_status: PaymentStatus;
  invitation_status: InvitationStatus;
  created_at: string;
  sender?: IUser;
  receiver?: IUser;
  event?: IEvent;
}

export interface IReview {
  id: string;
  user_id: string;
  event_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user: IUser;
  event: IEvent;
}

export interface IPayment {
  id: string;
  user_id: string;
  event_id: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  transaction_id: string;
  gateway_data: Record<string, unknown>;
  paid_at: string;
  user: IUser;
  event: IEvent;
}

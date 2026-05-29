export interface CarModel {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  msrp: number;
  image: string;
}

export interface Bid {
  id: string;
  dealerName: string;
  dealerLocation: string;
  dealerDistance: number;
  offerAmount: number;
  savings: number;
  isBestOffer: boolean;
  timestamp: string;
  status: 'pending' | 'submitted' | 'accepted';
  rating: number;
  reviewsCount: number;
}

export interface AuctionSession {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  zipCode: string;
  selectedCar: CarModel;
  bids: Bid[];
  status: 'active' | 'completed';
  timeRemainingSec: number;
}

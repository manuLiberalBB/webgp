export type CarouselItem = {
  id: string;
  label: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  href?: string;
  external?: boolean;
};

export type CarouselSource = 'company';

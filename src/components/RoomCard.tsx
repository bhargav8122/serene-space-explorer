
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RoomCardProps {
  title: string;
  description: string;
  imageSrc: string;
  path: string;
}

const RoomCard = ({ title, description, imageSrc, path }: RoomCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold text-interior-navy mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Link to={path} className="w-full">
          <Button className="w-full bg-interior-navy hover:bg-blue-900">
            Explore {title}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;

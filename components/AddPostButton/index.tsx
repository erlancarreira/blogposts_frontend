import { Plus } from "lucide-react-native";
import { FloatingButton } from "./styled";

interface AddPostButtonProps {
  onPress: () => void;
}

export default function AddPostButton({ onPress }: AddPostButtonProps) {
  return (
    <FloatingButton onPress={onPress}>
      <Plus size={28} color="#fff" />
    </FloatingButton>
  );
}

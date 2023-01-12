import { Routes, Route } from "react-router-dom";
import { Coffee } from "../coffee";
import { Coffees } from "../coffees";
import { Blend } from "../blend";
import { Blends } from "../blends";
interface Props { }
export const AppRoutes: React.FC<Props> = () => {
  return (
    <Routes>
      <Route path="*" element={<Coffee />} />
      <Route path="/coffee" element={<Coffee />} />
      <Route path="/coffees" element={<Coffees />} />
      <Route path="/blend" element={<Blend />} />
      <Route path="/blends" element={<Blends />} />
    </Routes>
  );
};

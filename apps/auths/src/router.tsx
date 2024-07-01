import { Link, Route, Routes } from "react-router-dom";

const MFE1Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Auth route 1</h1>
            <Link to="/mfe1">MFE 1 </Link>
          </>
        }
      />
    </Routes>
  );
};
export default MFE1Router;

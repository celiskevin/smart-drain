import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import Layout from "./components/Layout";

function App (){
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </Layout>
    </BrowserRouter>
  )
}

export default App;
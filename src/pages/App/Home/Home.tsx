import React from "react";
import Assets from "../../../components/Home/Assets/Assets";
import Portfolio from "../../../components/Home/Portfolio/Portfolio";
import Transactiions from "../../../components/Home/Transactions/Transactiions";
import MainLayout from "../../../layouts/MainLayout";

function Home() {
  return (
    <>
      <MainLayout>
        <div className="p-4">
          <div className="flex">
            <Portfolio />
            <Assets />
          </div>
          <Transactiions />
        </div>
      </MainLayout>
    </>
  );
}

export default Home;

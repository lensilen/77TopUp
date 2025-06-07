import { useEffect, useState } from "react";
import { IoGameController } from "react-icons/io5";
import { RiFilePaper2Fill, RiFilePaper2Line } from "react-icons/ri";
import { TbPackage } from "react-icons/tb";

const Dashboard = () => {
  const [gameCount, setGameCount] = useState("...");
  const [packageCount, setPackageCount] = useState("...");

  useEffect(() => {
    const fetchDataGames = async () => {
      try {
        const res = await fetch(
          `https://77-top-up-be.vercel.app/77topup/homepage`
        );

        if (!res.ok) throw new Error("Gagal mengambil data dari server.");

        const json = await res.json();
        setGameCount(json.games.length);

        const packagePromises = json.games.map(async (game) => {
          const res = await fetch(
            `https://77-top-up-be.vercel.app/77topup/${game.ihsangan_slug}`
          );

          if (!res.ok) return 0;

          const data = await res.json();
          return data.packages.length;
        });

        const packageCounts = await Promise.all(packagePromises);
        const totalPackages = packageCounts.reduce(
          (sum, count) => sum + count,
          0
        );
        setPackageCount(totalPackages);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchDataGames();
  }, []);

  const data = [
    {
      icon: <IoGameController size={50} />,
      bgColor: "primary",
      amount: gameCount,
      title: "Games",
    },
    {
      icon: <TbPackage size={50} />,
      bgColor: "primary",
      amount: packageCount,
      title: "Packages",
    },
    {
      icon: <RiFilePaper2Line size={50} />,
      bgColor: "primary",
      amount: 106,
      title: "Orders",
    },
  ];

  return (
    <div className="bg-blue-50">
      <h3 className="text-xl mb-4">Dashboard</h3>

      <div className="flex flex-row gap-8">
        {data?.map((d, index) => (
          <div
            key={index}
            className={`card w-56 h-50 bg-${d.bgColor} text-white`}
          >
            <div className="card-body flex flex-row gap-10 items-center justify-start">
              <div>
                <h2 className="card-title text-5xl font-bold">{d.amount}</h2>
                <h2 className="card-title text-xl">{d.title}</h2>
              </div>
              <div className="mb-2">{d.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

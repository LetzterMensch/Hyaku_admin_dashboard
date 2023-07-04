import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "../components";
import { client } from "../services/axios";

function displayStatus(status) {
  if (status == "accepted") {
    return "許可";
  } else if (status == "rejected") {
    return "不許可";
  } else if (status == "pending") {
    return "確認中";
  }
}
export const DetailStoreView = () => {
  const location = useLocation();

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const storeId = location.pathname.split("/")[2];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await (
        await client.get(`/stores/requests/${storeId}`)
      ).data;
      setData(response);
      console.log(data);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <div className="flex h-full justify-center items-center">
      <Spinner />
    </div>
  ) : error ? (
    <div className="flex h-full justify-center items-center">
      <p className="text-4xl">😢 Có lỗi xảy ra khi lấy dữ liệu</p>
    </div>
  ) : (
    <div className="p-8">
      <div className="bg-white flex flex-col rounded-lg p-4">
        <h2 className="text-center font-medium text-2xl mb-4">
          <i>{data.name}</i>
          <b> のリクエスト</b>
        </h2>
        <div className="flex flex-row justify-between px-6">
          <div>
            <h3 className="">
              <b>喫茶店の名前: </b>
              {data.name}
            </h3>
            <br></br>
            <h3 className="">
              <b>ステータス: </b>
              <b
                className={`w-fit mx-auto p-2 rounded-lg
                            ${
                              data.status === "accepted"
                                ? "bg-green-300"
                                : data.status === "rejected"
                                ? "bg-red-300"
                                : data.status === "pending"
                                ? "bg-yellow-300"
                                : ""
                            }`}
              >
                {displayStatus(data.status)}
              </b>
            </h3>
            <br></br>

            <div></div>
            <h3 className="">
              <b>アドレス: </b>
              {data.address}
            </h3>
          </div>
          <div>
            <h3 className="">
              <b>作成の日日: </b>
              {dayjs(dayjs(data.createdAt)).format("H:mm  DD/MM/YYYY")}
            </h3>
            <h3 className="">
              <b>確認の日日: </b>
              {dayjs(dayjs(data.updatedAt)).format("H:mm  DD/MM/YYYY")}
            </h3>
          </div>
        </div>
        <br></br>
        <br></br>

        <h2 className="text-center font-bold text-xl mb-4 ">
          証明の写真 {data.type}
        </h2>
        {/* Table */}
        <div className="overflow-x-auto relative">
          <table className="border-collapse w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-center border border-slate-300">
                  喫茶店のフロント
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  喫茶店からのビュー
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  喫茶店の中身
                </th>
              </tr>
            </thead>
            <tbody>
                  <tr className="bg-white hover:bg-slate-100">
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border border-slate-300">
                      <img src={`${data.front_picture}`} className="w-full"></img>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border border-slate-300">
                      <img src={`${data.view_picture}`} className="w-full"></img>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border border-slate-300">
                      <img src={`${data.inside_picture}`} className="w-full"></img>
                    </td>
                  </tr>
            </tbody>
          </table>
          <table className="border-collapse w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-center border border-slate-300">
                  喫茶店の営業許可証
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  喫茶店のエアコン
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  喫茶店の駐車場
                </th>
              </tr>
            </thead>
            <tbody>
                  <tr className="bg-white hover:bg-slate-100">
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border border-slate-300">
                      <img src={`${data.business_license_pic}`} className="w-full"></img>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border border-slate-300">
                      <img src={`${data.ac_picture}`} className="w-full"></img>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border border-slate-300">
                      <img src={`${data.parking_lot_picture}`} className="w-full"></img>
                    </td>
                  </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

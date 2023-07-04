/* eslint-disable no-unused-vars */
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { STurnDown } from "tabler-icons-react";
import { Pagination, Spinner } from "../components";
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
const RequestView = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [store, setStore] = useState();
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const {data } = await client.get(`/stores`);
      setData(data);
      console.log(data)
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleImport = async (status, id) => {
    setLoading(true);
    try {
      
      // const store_info = await client.get(`/stores/${id}`)
      // setStore(store_info?.data)
      // // console.log(store_info
      // console.log(store)
      // console.log(store.status)
      // store.status = status
      // store.status = status
      console.log("Changing status")
      console.log(status);
      await client.patch(`/stores/${id}/status`, {
        status
      });

      const arr = data?.map((item) => {
        if (item.id === id) {
          item.status = status;
        }
        return item;
      });
      setData(arr);
      console.log("Done")
    } catch (error) {
      // console.log(status);
      // console.log(id);
      console.log(error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, [page, status]);

  return loading ? (
    <div className="flex h-full justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="p-8">
      <div className="bg-white flex flex-col rounded-lg p-4">
        {/* **Sorting** */}
        {/* <div className="mb-4">
          <label htmlFor="">状態: </label>
          <select
            className="bg-slate-50 border rounded-lg border-slate-300 px-4 py-3 appearance-none focus:outline-none"
            name="accepted"
            id=""
            value={status}
            onChange={(e) => setStatus(e.currentTarget.value)}
          >
            <option value="" defaultChecked>
              全て
            </option>
            <option value="accepted">許可</option>
            <option value="pending">確認中</option>
            <option value="rejected">不許可</option>
          </select>
        </div> */}
        <div className="text-center text-4xl py-4 font-bold">喫茶店登録</div>
        {/* Table */}
        <div className="overflow-x-auto relative">
          <table className="border-collapse w-full text-sm text-left text-gray-500 border border-slate-300">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-center border border-slate-300">
                  ID
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  作成日日
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  確認日日
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  状態
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.length !== 0 ? (
                data?.map((item, index) => (
                  <tr className="bg-white hover:bg-slate-100" key={index}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border border-slate-300"
                    >
                      {item.id}
                    </th>
                    <td className="py-4 px-6 border border-slate-300">
                      {dayjs(dayjs(item.createdAt)).format("H:mm DD/MM/YYYY")}
                    </td>
                    <td className="py-4 px-6 border border-slate-300">
                      {dayjs(dayjs(item.updatedAt)).format("H:mm DD/MM/YYYY")}
                    </td>
                    <td className="py-4 px-6 border border-slate-300">
                      <div
                        className={`w-fit mx-auto p-2 rounded-lg
                            ${
                              item.status === "accepted"
                                ? "bg-green-300"
                                : item.status === "rejected"
                                ? "bg-red-300"
                                : item.status === "pending"
                                ? "bg-yellow-300"
                                : ""
                            }`}
                      >
                        {displayStatus(item.status)}
                      </div>
                    </td>
                    <td className="py-4 px-6 border border-slate-300 text-center">
                      <Link
                        className={`p-2 rounded-lg bg-blue-300 text-black mr-2`}
                        to={`/stores/${item.id}`}
                      >
                        詳細を見る
                      </Link>
                      {item.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleImport("accepted", item.id)}
                            className={`p-2 rounded-lg bg-green-300 text-black mr-2`}
                          >
                            許可
                          </button>
                          <button
                            onClick={() => handleImport("rejected", item.id)}
                            className={`p-2 rounded-lg bg-red-300 text-black`}
                          >
                            不許可
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th
                    colSpan={5}
                    className="w-full text-slate-300 p-4 border border-slate-300 text-center"
                  >
                    <p className="text-2xl text-slate-400 py-10">
                      データがない 😎
                    </p>
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Pagination page={page} setPage={setPage} maxPages={maxPages} />
        </div>
      </div>
    </div> // end
  );
};

export default RequestView;

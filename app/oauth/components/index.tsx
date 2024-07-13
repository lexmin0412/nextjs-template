"use client";

import {useEffect, useState} from "react";

export default function OAuthComponent(props: {code:  string, sourceURI: string}) {

	const  {code, sourceURI} = props;

  const [errorDetail, setErrorDetail] = useState({
    visible: false,
    title: "",
    description: "",
  });

  const getAuthURLAndJump = async () => {
    const res = await fetch("/guard/api/oauth/auth-url").then((res) =>
      res.json()
    );
    console.log("res.data.authURL", res.data.authURL);
    window.location.href = res.data.authURL;
  };

  useEffect(() => {
    if (code) {
      // 有 code 表示回来了，换个 token 调回去
      getTokenAndGoBack(code);
      // window.location.href = `${sourceURL}?code=${code}`
    } else {
      if (sourceURI) {
        localStorage.setItem("GUARD_SOURCE_URI", sourceURI);
      }
      getAuthURLAndJump();
    }
  }, []);

  const getTokenAndGoBack = async (code: string) => {
    fetch(`/guard/api/oauth/access-token?code=${code}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("res111", res);
        console.log("token", res);
        if (!res.data?.access_token) {
          console.error("获取 token 失败", res.message);
          return;
        }
        const sourceURL = localStorage.getItem("GUARD_SOURCE_URI");
        const callbackURL = `${sourceURL}?token=${res.data.access_token}`;
        console.log("跳回去咯", callbackURL);
        window.location.href = callbackURL;
      })
      .catch((err) => {
        console.error("换 token 接口异常", err);
        setErrorDetail({
          visible: true,
          title: "获取 token 失败",
          description: err.message,
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {errorDetail.visible ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black opacity-50">
          <div className="bg-white rounded p-4 shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">{errorDetail.title}</h3>
            <p>{errorDetail.description}</p>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">OAuth</h1>
          <div>正在登录...</div>
        </>
      )}
    </div>
  );
}

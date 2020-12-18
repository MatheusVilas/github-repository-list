import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface UrlParamsProps {
  children?: ReactNode;
}

type urlParam = string | null;

interface IUrlParams {
  accessToken: urlParam;
  userName: urlParam;
  location: urlParam;
  bio: urlParam;
  avatar: urlParam;
  url: urlParam;
}

export default function UrlParams({ children }: UrlParamsProps) {
  const query = useQuery();

  useEffect(() => {
    const urlParams: IUrlParams = {
      accessToken: query.get("accessToken"),
      userName: query.get("userName"),
      location: query.get("location"),
      bio: query.get("bio"),
      avatar: query.get("avatar"),
      url: query.get("url"),
    };

    persistOnLocalStorage(urlParams);
  }, [query]);

  function persistOnLocalStorage(urlParams: IUrlParams) {
    Object.entries(urlParams).forEach(([key, value]) => {
      if (value) localStorage.setItem(key, value);
    });
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return <main>{children}</main>;
}

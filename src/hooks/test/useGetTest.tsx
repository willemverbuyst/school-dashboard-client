import { useState } from "react";
import { useQuery } from "react-query";

import { axiosInstance, getJWTHeader } from "../../axiosInstance";
import { ApiUser, Data } from "../../models/api/user.api";
import { queryKeys } from "../../react-query/constants";
import { useUser } from "../auth/useUser";

const getTest = async (subjectId: string, user: ApiUser | null) => {
  try {
    if (!user) return null;
    const { data } = await axiosInstance.get(`/test/subjects/${subjectId}`, {
      headers: getJWTHeader(user),
    });

    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const useGetTest = () => {
  const { user } = useUser();
  const [subjectId, setSubjectId] = useState("");
  const fallback: Data[] = [];
  const { data: mcQuestions = fallback } = useQuery(
    [queryKeys.STUDENT_TEST, subjectId],
    () => getTest(subjectId, user)
  );

  return { mcQuestions, subjectId, setSubjectId };
};

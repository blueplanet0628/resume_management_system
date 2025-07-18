import { useQuery } from "@tanstack/react-query";

export {
  useVerificationCheck,
  useBusinessProfile,
  useSeekerProfile,
  useScoutedSeekers,
  useAppliedSeekers,
  useMessages,
  useMultiTypeMessages,
  useScoutBusinesses,
  useMyResume,
  useSeekerResume,
  useUserFromResetToken,
  usePaymentInfo,
  useCurrentPlans,
};

const useVerificationCheck = (token: string | null) =>
  useQuery({
    queryKey: ["verification", { token }],
    queryFn: checkVerificationLink(token ?? ""),
    retry: 1,
    enabled: !!token,
  });

const useBusinessProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: getBusinessProfile,
    retry: 1,
  });

const useSeekerProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: getSeekerProfile,
    retry: 1,
  });

const useScoutedSeekers = () =>
  useQuery({
    queryKey: ["scouted-seekers"],
    queryFn: getScoutedSeekers,
    retry: 1,
  });

const useScoutBusinesses = () =>
  useQuery({
    queryKey: ["scout-businesses"],
    queryFn: getScoutBusinesses,
    retry: 1,
  });

const useAppliedSeekers = () =>
  useQuery({
    queryKey: ["applied-seekers"],
    queryFn: getAppliedSeekers,
    retry: 1,
  });

const useMessages = (type: string, receiverId?: number) =>
  useQuery({
    queryKey: ["messages", { type, receiverId }],
    queryFn: getMessages(type, receiverId),
    retry: 1,
  });

const useMultiTypeMessages = (typeList: string[], receiverId?: number) =>
  useQuery({
    queryKey: ["messages", { typeList, receiverId }],
    queryFn: getMessagesForMultiTypes(typeList, receiverId),
    retry: 1,
  });

const useMyResume = () =>
  useQuery({
    queryKey: ["resume"],
    queryFn: getMyResume,
    retry: 1,
  });

const useSeekerResume = (userId: number) =>
  useQuery({
    queryKey: ["resume", { userId }],
    queryFn: getSeekerResume(userId),
    retry: 1,
    enabled: !!userId,
  });

const useUserFromResetToken = (token: string) =>
  useQuery({
    queryKey: ["reset", { token }],
    queryFn: getUserUsingResetToken(token),
    retry: 1,
    enabled: !!token,
  });

const usePaymentInfo = () =>
  useQuery({
    queryKey: ["payment"],
    queryFn: getPaymentInfo,
    retry: 1,
  });

const useCurrentPlans = () =>
  useQuery({
    queryKey: ["current-plans"],
    queryFn: getCurrentPlans,
    retry: 1,
  });

const checkVerificationLink = (token: string) => async () => {
  const response = await fetch(`/api/verification?token=${token}`);

  if (!response.ok) throw new Error(`Http error`);

  return response.json();
};

const getBusinessProfile = async () => {
  const response = await fetch(`/api/business/profile`);

  if (!response.ok) throw new Error(`Http error`);

  return response.json();
};

const getSeekerProfile = async () => {
  const response = await fetch(`/api/seeker/profile`);

  if (!response.ok) throw new Error(`Http error`);

  return response.json();
};

const getScoutedSeekers = async () => {
  const response = await fetch(`/api/business/search/scout`);

  if (!response.ok) throw new Error(`Http error`);

  return response.json();
};

const getScoutBusinesses = async () => {
  const response = await fetch(`/api/seeker/search/scout`);

  if (!response.ok) throw new Error(`Http error`);

  return response.json();
};

const getAppliedSeekers = async () => {
  const response = await fetch(`/api/business/search/applied`);

  if (!response.ok) throw new Error(`Http error`);

  return response.json();
};

const getMessages = (type: string, receiverId?: number) => async () => {
  let url = `/api/message?type=${type}`;
  if (receiverId) url = `${url}&receiverId=${receiverId}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Http error`);

  return response.json();
};

const getMessagesForMultiTypes =
  (typeList: string[], receiverId?: number) => async () => {
    let url = `/api/message/multi-type?typeList=${typeList.join(",")}`;
    if (receiverId) url = `${url}&receiverId=${receiverId}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Http error`);

    return response.json();
  };

  const getMyResume = async () => {
    const token = localStorage.getItem("token"); // Ensure token is available
  
    const response = await fetch("http://localhost:9000/get-resume-data", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }
  
    return await response.json();
  };

const getSeekerResume = (userId: number) => async () => {
  const response = await fetch(`/api/seeker/resume/detail?id=${userId}`);

  if (!response.ok) throw new Error(`Http error`);

  return response.json();
};

const getUserUsingResetToken = (token: string) => async () => {
  const response = await fetch(`/api/reset-pwd/user?token=${token}`);

  if (!response.ok) throw new Error(`Http error`);

  return response.json();
};

const getPaymentInfo = async () => {
  const response = await fetch(`/api/payment/load`);

  if (!response.ok) throw new Error(`Http error`);

  return response.json();
};

const getCurrentPlans = async () => {
  const response = await fetch(`/api/seeker/payment/current-plans`);

  if (!response.ok) throw new Error(`Http error`);

  return response.json();
};

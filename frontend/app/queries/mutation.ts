import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export {
  useRegisterLogin,
  useUpdateProfile,
  useUpdatePassword,
  useSearchSeekers,
  useScoutSeeker,
  useMessage,
  useMessageToUser,
  useApplyToBusiness,
  useSaveResume,
  useRegisterResume,
  useSendPdfToEmail,
  useRequestResetPwd,
  usePlanSubscribe,
  useCreditCard,
  useCheckPlanAccess,
  useSearchScoutBusinesses,
};

const emptyHandler = () => {};

const useRegisterLogin = (
  type: string,
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: registerLoginUser(type),
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const useUpdateProfile = (
  type: string,
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: updateProfile(type),
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const useUpdatePassword = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: updatePassword,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const useSearchSeekers = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: searchSeekers,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const useScoutSeeker = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: scoutSeeker,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const useMessage = (
  receiverId: number,
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: sendMessage(receiverId),
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const useMessageToUser = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: sendMessageToUser,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const useApplyToBusiness = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: sendApplication,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const useSaveResume = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: saveResume,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const useRegisterResume = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: registerResume,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const useSendPdfToEmail = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: resumeImageData,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const useRequestResetPwd = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: requestResetPwd,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const usePlanSubscribe = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscribePlan,
    onSuccess: (data) => {
      // Invalidate current plans query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["current-plans"] });
      onSuccess?.(data);
    },
    onError: onError ?? emptyHandler,
  });
};

const useCreditCard = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: saveCreditCard,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const checkPlanAccess = async (data: any) => {
  // Debug: log the payload
  // Debug: log the cookie
  if (typeof document !== "undefined") {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("xrosspoint_user="));
    if (userCookie) {
      const userValue = userCookie.split("=")[1];
      try {
        const user = JSON.parse(decodeURIComponent(userValue));
        console.log("[checkPlanAccess] xrosspoint_user cookie:", user);
      } catch (e) {
        console.log(
          "[checkPlanAccess] Error parsing xrosspoint_user cookie:",
          e
        );
      }
    } else {
      console.log("[checkPlanAccess] No xrosspoint_user cookie found");
    }
  }

  const _res = await fetch("/api/seeker/payment/check-access", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  // Debug: log the response
  const res = await _res.json().catch(() => ({}));
  console.log("[checkPlanAccess] Response:", res);

  if (!_res.ok) {
    const errorData = res;
    throw new Error(errorData.message);
  }
  return res;
};

const useCheckPlanAccess = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: checkPlanAccess,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

const registerLoginUser = (type: string) => async (data: any) => {
  const url =
    type == "seeker_login"
      ? "/api/seeker/login"
      : type == "seeker_register"
        ? "/api/seeker/register"
        : type == "business_login"
          ? "/api/business/login"
          : "/api/business/register";

  // Add timeout to prevent long delays
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const _res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      signal: controller.signal,
    });

    // clearTimeout(timeoutId);
    if (_res.status === 400) {
      const errorData = await _res.json().catch(() => null);
      toast.error(errorData?.message || "Register failed");
    }

    if (!_res.ok) {
      const errorData = await _res.json().catch(() => null);
      throw new Error(errorData?.message || "Login failed");
    }
    return _res.json().catch(() => ({}));
  } catch (error) {
    // clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Login request timed out. Please try again.");
    }
    throw error;
  }
};

const updateProfile = (type: string) => async (data: any) => {
  console.log(data);
  const _res = await fetch(
    type == "seeker" ? "/api/seeker/profile" : "/api/business/profile",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    }
  );

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData.message);
  }
  return _res.json().catch(() => ({}));
};

const updatePassword = async (data: any) => {
  const _res = await fetch("/api/password", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData.message);
  }
  return _res.json().catch(() => ({}));
};

const searchSeekers = async (data: any) => {
  const _res = await fetch("/api/business/search", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData.message);
  }
  return _res.json().catch(() => ({}));
};

const scoutSeeker = async (data: any) => {
  const _res = await fetch("/api/business/scout", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData.message);
  }
  return _res.json().catch(() => ({}));
};

const sendMessage = (receiverId: number) => async (data: any) => {
  const message: any = {
    ...data,
  };
  if (receiverId) message.receiverId = receiverId;
  const _res = await fetch("/api/message", {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData.message);
  }
  return _res.json().catch(() => ({}));
};

const sendMessageToUser = async (data: any) => {
  const _res = await fetch("/api/message", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData.message);
  }
  return _res.json().catch(() => ({}));
};

const sendApplication = async (data: any) => {
  const _res = await fetch("/api/seeker/apply", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData?.message || "Application failed");
  }

  const res = await _res.json();

  if (res.success) {
    toast.success("成功");
  }

  return res;
};

const saveResume = async (data: any) => {
  const _res = await fetch("/api/seeker/resume", {
    method: "POST",
    body: JSON.stringify({
      ...data,
      status: "0", // Draft version
    }),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  const res = await _res.json();

  if (res.success) {
    toast.success("成功");
  }

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData.message);
  }

  return _res.json().catch(() => ({}));
};

const registerResume = async (data: any) => {
  const _res = await fetch("/api/seeker/resume", {
    method: "POST",
    body: JSON.stringify({
      ...data,
      status: "1", // Draft version
    }),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData.message);
  }
  return _res.json().catch(() => ({}));
};

const resumeImageData = async (imgBase64Data: string) => {
  const _res = await fetch("/api/seeker/resume/pdf", {
    method: "POST",
    body: JSON.stringify({
      image: imgBase64Data,
    }),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  const responseData = await _res.json();

  if (!_res.ok) {
    throw new Error(responseData.message || "PDFの送信に失敗しました");
  }

  return responseData;
};

const requestResetPwd = async (data: any) => {
  const _res = await fetch("/api/reset-pwd", {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData.message);
  }
  return _res.json().catch(() => ({}));
};

const subscribePlan = async (data: any) => {
  const _res = await fetch("/api/seeker/payment/subscribe", {
    method: "POST",
    body: JSON.stringify({
      planIdList: data,
    }),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  const res = await _res.json();
  if (res.success) {
    toast.success("成功");
  }
  if (res.message) {
    toast.error(res.message);
  }

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData.message);
  }
  return _res.json().catch(() => ({}));
};

const saveCreditCard = async (data: any) => {
  const _res = await fetch("/api/payment/save/credit-card", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData.message);
  }
  return _res.json().catch(() => ({}));
};

const searchScoutBusinesses = async (data: any) => {
  const _res = await fetch("/api/seeker/search/scout", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!_res.ok) {
    const errorData = await _res.json().catch(() => null);
    throw new Error(errorData.message);
  }
  return _res.json().catch(() => ({}));
};

const useSearchScoutBusinesses = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: searchScoutBusinesses,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });

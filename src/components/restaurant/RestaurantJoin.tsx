import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import styles from "./RestaurantJoin.module.scss";

interface IFormInput {
  owner: string;
  registNum: string;
  businessLicense: FileList;
  operationCertificate: FileList;
  bankStatement: FileList;
  storePhone: string;
  storeType: string;
  storeName : string;
  logo: FileList;
  storeContent: string;
  openingHour: string;
  holiday: string;
  storeFacilities: string[];
  ownerId: string;
  ownerPassword: string;
  ownerPasswordConfirm: string;
  storeLocation: string;
}

function RestaurantJoin() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<IFormInput>();
  const [storeFacilities, setstoreFacilities] = useState<string[]>([]); // 편의시설 정보
  const ownerPassword = watch("ownerPassword");
  const ownerPasswordConfirm = watch("ownerPasswordConfirm");

  //편의시설 체크박스
  const storeFacilitiesOptions = [
    { label: "반려동물", value: "petFriendly" },
    { label: "단체석구비", value: "groupSeating" },
    { label: "유아용 의자", value: "childChair" },
    { label: "룸", value: "privateRoom" },
    { label: "콜키지", value: "corkage" },
    { label: "유아 놀이방", value: "playArea" },
    { label: "남녀화장실분리", value: "separatedRestrooms" },
    { label: "테라스", value: "terrace" },
    { label: "주차", value: "parking" },
    { label: "WI-FI", value: "wifi" },
    { label: "대관", value: "rental" },
  ];
  //체크박스 처리 from
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const updatedstoreFacilities = checked
      ? [...storeFacilities, value]
      : storeFacilities.filter((f) => f !== value);
    setstoreFacilities(updatedstoreFacilities);
    setValue("storeFacilities", updatedstoreFacilities);
  };

  //제출 함수
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (window.confirm(`입점 신청을 하시겠습니까?`)) {
      const formData = new FormData();
      formData.append("ownerLId", data.ownerId);
      formData.append("ownerPassword", data.ownerPassword);
      formData.append("registNum", data.registNum);
      formData.append("storeName", data.storeName);
      formData.append("storePhone", data.storePhone);
      formData.append("storeContent", data.storeContent);
      formData.append("storeLocation", data.storeLocation);
      formData.append("openingHour", data.openingHour);
      formData.append("storeFacilities", data.storeFacilities.join(","));
      console.log("formData:", formData);
      
      formData.forEach((value, key) => {
        console.log(key, value);
      });


      //----------------------- backend 통신 부분 -----------------------
      try {
        console.log("통신시작");
        const response = await axios.post(
          "http://localhost:9000/owner/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Server Response:", response.data);
        alert("입점 신청이 완료되었습니다.");
      } catch (error) {
        console.error("backend error:", error);
      }
    }
  };

  //아이디 중복 검사
  // const checkDuplicateId = async (userId: string) => {
  //   try {
  //     const response = await axios.post("localhost://9000/", { userId });
  //     return response.data.isAvailable ? true : "이미 사용중인 아이디입니다.";
  //   } catch (error) {
  //     console.error("아이디 중복 확인 에러:", error);
  //     return "아이디 중복 확인에 실패했습니다.";
  //   }
  // };
  //----------------------------------------------------------------
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>잇츠타임 입점신청</h1>
        <p className={styles.description}>
          하단 엑셀 파일에 식당 정보 (메뉴, 가격 등)을 작성해주시고 파일을
          업로드 해주세요. 구체적인 정보가 불충분할 시, 반려될 수 있습니다.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>아이디</label>
          <input
            type="text"
            {...register("ownerId", {
              required: "아이디를 입력해주세요.",
            })}
          />
          {/* {errors.userId && <p>{errors.userId.message}</p>} */}
          <label>비밀번호</label>
          <input
            type="ownerPassword"
            {...register("ownerPassword", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message:
                  "8자리 이상, 영어 대소문자 혼용, 숫자, 특수문자를 포함해야 합니다.",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/,
                message:
                  "8자리 이상, 영어 대소문자 혼용, 숫자, 특수문자를 포함해야 합니다.",
              },
            })}
            onChange={async (e) => {
              await trigger("ownerPassword");
            }}
          />

          {errors.ownerPassword && (
            <p>
              {errors.ownerPassword.type === "minLength" &&
                "8자리 이상, 영어 대소문자 혼용, 숫자, 특수문자를 포함해야 합니다."}
              {errors.ownerPassword.type === "pattern" &&
                "8자리 이상, 영어 대소문자 혼용, 숫자, 특수문자를 포함해야 합니다."}
            </p>
          )}

          <label>비밀번호 확인</label>
          <input
            type="ownerPassword"
            {...register("ownerPasswordConfirm", {
              required: "비밀번호 확인을 입력해주세요.",
            })}
          />
          {errors.ownerPasswordConfirm && <p>{errors.ownerPasswordConfirm.message}</p>}
          {ownerPassword && ownerPasswordConfirm && ownerPassword !== ownerPasswordConfirm && (
            <p>비밀번호가 일치하지 않습니다.</p>
          )}
          <div>
            <label>사업자 등록번호</label>
            <input type="text" {...register("registNum")} />
            
            <label>사업주</label>
            <input type="file" {...register("businessLicense")} />
            <label>사업자등록증</label>
            <input type="file" {...register("businessLicense")} />

            <label>영업신고증</label>
            <input type="file" {...register("operationCertificate")} />

            <label>통장사본</label>
            <input type="file" {...register("bankStatement")} />
            <label>업종</label>
            <input type="text" {...register("storeType")} />

            <label>가게명</label>
            <input type="text" {...register("storeName")} />

            <label>가게 전화번호</label>
            <input type="text" {...register("storePhone")} />

            <label>로고 이미지</label>
            <input type="file" {...register("logo")} />

            <label>가게 소개</label>
            <input type="text" {...register("storeContent")}  />

            <label>주소 </label>
            <input type="text" {...register("storeLocation")} />
            <label>영업시간</label>
            <input type="text" {...register("openingHour")} />

            <label>휴무일</label>
            <input type="text" {...register("holiday")} />
          </div>
          <h1>편의 시설</h1>
          <div className={styles.checkboxGroup}>
            {storeFacilitiesOptions.map(({ label, value }) => (
              <div className={styles.checkboxContainer} key={value}>
                <input
                  type="checkbox"
                  id={value}
                  value={value}
                  onChange={handleCheckboxChange}
                  checked={storeFacilities.includes(value)}
                />
                <label htmlFor={value}>{label}</label>
              </div>
            ))}
          </div>

          <button type="submit">입점 신청하기</button>
        </form>
      </div>
    </div>
  );
}

export default RestaurantJoin;

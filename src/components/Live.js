/* eslint-disable jsx-a11y/anchor-is-valid */
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../styles/live.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Live() {
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // js 코드 자리
  // JSX 의 요소를 React 에서 참조
  const swiperRef = useRef();
  // JSON 데이터 저장해 두고, 자료가 바뀌면 화면을 변경할
  // 리액트 변수를 만든다.
  const [htmlTag, setHtmlTag] = useState([]);

  const axiosGetData = () => {
    axios
      .get("live.json")
      .then(function (res) {
        // console.log(res.data);

        const result = res.data;
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const item = result["good_" + (i + 1)];
          arr[i] = item;
        }
        // console.log(arr);
        setHtmlTag(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 외부 데이터 연동하기 (fetch 이용)
  // const getJsonData = () => {
  //   fetch("live.json")
  //     .then((response) => {
  //       console.log("response : ", response);
  //       // 자료가 불러들여졌을 때
  //       return response.json();
  //     })
  //     .then((result) => {
  //       console.log("result : ", result);
  //       // 자료를 원하는데로 처리하겠다.
  //       // result를 화면에 출력하겠다.
  //       // 자료가 바뀌면 화면을 변경하는 기능을 생성하겠다.
  //       let arr = [];
  //       for (let i = 0; i < result.total; i++) {
  //         const item = result["good_" + (i + 1)];
  //         arr[i] = item;
  //       }
  //       console.log(arr);
  //       setHtmlTag(arr);
  //     })
  //     .catch((error) => {
  //       // 에러가 발생했다.
  //       console.log("error : ", error);
  //     });
  // };

  // html 이 준비가 되면, json 을 불러들이겠다.
  // 1. 외부데이터 부르기 좋은 자리
  // 2. html 태그 참조 (useRef 할때 )
  // 3. window 참조할때
  // 4. window.addEventListener("scroll"...)
  // 5. cleanUp 할때 : 컴포넌트 화면에서 사라질때 실행할 함수
  // 6. 타이머 만들고, 제거할때.
  // 컴포넌트가 화면에 보여질 때 실행할 내용 기재 장소
  // use 는 Hook 이라고 합니다.
  // 원하는 시점을 감시하고 실행할 함수
  useEffect(() => {
    // 외부 데이터 불러들이기
    axiosGetData();
    // getJsonData();
  }, []);

  return (
    <section class="live">
      <div class="live-inner">
        <div class="live-header">
          <h2 class="live-title">
            <img src="images/title_live.svg" alt="" />
          </h2>
        </div>
        <div className="live-main">
          <div className="live-slide-wrap">
            <Swiper
              slidesPerView={4}
              spaceBetween={27}
              slidesPerGroup={4}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".live-slide-wrap .slide-next-bt",
                prevEl: ".live-slide-wrap .slide-prev-bt",
              }}
              className="live-slide"
            >
              {htmlTag.map(function (item, index) {
                return (
                  <SwiperSlide key={index}>
                    <div class="live-slide-item">
                      <a href={item.url} class="live-link">
                        <div class="live-img">
                          <img src={item.image} alt="" />
                        </div>
                        <div class="live-item-info">
                          <i>{item.badge}</i>
                          <div class="live-item-name">{item.name}</div>
                        </div>
                      </a>
                      <a href="#" class="live-sub">
                        <div class="live-cen">
                          <span class="live-day">{item.date || ""}</span>
                          <span class="live-time">{item.time || ""}</span>
                        </div>
                      </a>
                      <div class="live-product">
                        <a href={item.good_url} class="live-product-a">
                          <div class={item.ig_class}>
                            <img
                              src={item.good_image ? item.good_image : ""}
                              alt=""
                            />
                          </div>
                          <div class="live-product-info">
                            <div class="live-product-price">
                              <span class="product-percent">
                                <em>
                                  {item.good_discount &&
                                    item.good_discount + "%"}
                                </em>
                              </span>
                              <span class="product-won">
                                <em>
                                  {numberWithCommas(
                                    item.good_price
                                      ? item.good_price + "원"
                                      : ""
                                  )}
                                </em>
                                <span class="product-currency"></span>
                              </span>
                            </div>
                            <div class="live-product-name">
                              {item.good_tittle ? item.good_tittle : ""}
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <button className="slide-prev-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
            <button className="slide-next-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="live-footer">
          <button className="live-ft-bt" href="#">
            인터파크 라이브 홈 바로가기
          </button>
        </div>
      </div>
    </section>
  );
}
export default Live;

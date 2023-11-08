/* eslint-disable jsx-a11y/anchor-is-valid */
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../styles/ticket.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Ticket() {
  // js 코드 자리
  // JSX 의 요소를 React 에서 참조
  const swiperRef = useRef();
  // JSON 데이터 저장해 두고, 자료가 바뀌면 화면을 변경할
  // 리액트 변수를 만든다.
  const [htmlTag, setHtmlTag] = useState([]);

  const axiosGetData = () => {
    axios
      .get("ticket.json")
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
  //   fetch("ticket.json")
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
    <section class="ticket">
      <div class="ticket-inner">
        <div class="ticket-header">
          <h2 class="ticket-title">티켓랭킹</h2>
          <span class="ticket-txt">오늘 뭐볼까? 지금 HOT한 공연.</span>
        </div>

        <div class="ticket-main">
          <div class="ticket-cate">
            <ul class="ticket-list">
              <li>
                <button class="ticket-cate-bt ticket-cate-bt-active">
                  뮤지컬
                </button>
              </li>
              <li>
                <button class="ticket-cate-bt">콘서트</button>
              </li>
              <li>
                <button class="ticket-cate-bt">스포츠</button>
              </li>
              <li>
                <button class="ticket-cate-bt">전시/행사</button>
              </li>
              <li>
                <button class="ticket-cate-bt">클래식/무용</button>
              </li>
              <li>
                <button class="ticket-cate-bt">아동/가족</button>
              </li>
              <li>
                <button class="ticket-cate-bt">연극</button>
              </li>
              <li>
                <button class="ticket-cate-bt">레저/캠핑</button>
              </li>
            </ul>
          </div>

          <div className="ticket-slide-wrap">
            <Swiper
              slidesPerView={4}
              spaceBetween={27}
              slidesPerGroup={4}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".ticket-slide-wrap .slide-next-bt",
                prevEl: ".ticket-slide-wrap .slide-prev-bt",
              }}
              className="ticket-slide"
            >
              {htmlTag.map(function (item, index) {
                return (
                  <SwiperSlide key={index}>
                    <div class="ticket-slide-item">
                      <a href={item.url} class="ticket-link">
                        <div class="ticket-img">
                          <img src={item.image} alt={item.tit} />
                          <span>{item.rank}</span>
                        </div>
                        <div class="ticket-info">
                          <ul class="ticket-good-list">
                            <li>
                              <span class="ticket-good-info-tit">
                                <p>{item.tit}</p>
                              </span>
                            </li>
                            <li>
                              <span class="ticket-good-info-place">
                                {item.place}
                              </span>
                              <span class="ticekt-good-info-date">
                                {item.date}
                              </span>
                            </li>
                            <div class="ticket-badge">
                              <i class={item.class}>{item.badge || ""}</i>
                            </div>
                          </ul>
                        </div>
                      </a>
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

        <div className="ticket-footer">
          <button className="ticket-ft-bt" href="#">
            티켓 홈 바로가기
          </button>
        </div>
      </div>
    </section>
  );
}
export default Ticket;

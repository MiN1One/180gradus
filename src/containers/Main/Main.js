import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BiChevronLeft, BiCartAlt, BiChevronRight, BiX } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/swiper.scss";

import * as actions from "../../store/actions";
import "./Main.scss";
import { connect } from "react-redux";
import SubSpinner from "../../UI/SubSpinner/SubSpinner";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axiosInstance from "../../axios";
import useEditFavorites from "../../hooks/useEditFavorites";
import useEditCart from "../../hooks/useEditCart";

SwiperCore.use([Navigation, Pagination]);

const Main = (props) => {
  const params = useParams();
  const history = useHistory();

  const [data, setData] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState(null);
  const mounted = useRef();

  const { isFavorite, editFavorites } = useEditFavorites();
  const { inTheCart, editCart } = useEditCart();

  const { t } = useTranslation(["translation", data && data.device]);

  useEffect(() => swiper && swiper.update(), [data, swiper]);

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  const image = selectedSkin && selectedSkin.image;
  useEffect(() => {
    if (selectedSkin) {
      setLoadingImage(true);
      const imagePreloader = new Image();

      imagePreloader.src = `/images/${selectedSkin.image}`;

      if (imagePreloader.complete) {
        setLoadingImage(false);
        imagePreloader.onload = null;
      } else {
        imagePreloader.onload = () => {
          setLoadingImage(false);
          imagePreloader.onload = null;
        };
      }
    }
  }, [image, selectedSkin]);

  useEffect(() => {
    if (mounted.current) {
      axiosInstance(`/skins/${params.id}`)
        .then(({ data }) => {
          setData(data.data.data);
          props.onSetData("data", data.data.data.device);
          console.log(data);
        });
    }
  }, [params.category, params.id, props.error, props.onSetData]);

  let 
    skinsSlide = null,
    deviceName = null;

  if (data) {
    deviceName = data.device;

    const numSlides = Math.ceil(data.skins.length / 9);
    let skinsArr = [];
    if (numSlides) {
      for (let i = 0; i < numSlides; i++)
        skinsArr.push([...data.skins.slice(i * 9, 9 * (i + 1))]);
    } else {
      skinsArr.push([...data.skins]);
    }

    skinsSlide = skinsArr.map((el, i) => {
      const skins = el.map((skin, index) => {
        const category =
          props.categories &&
          props.categories.find((cat) => cat._id === data.category);

        skin.device = deviceName;
        skin.category = category && category.name;
        skin.deviceId = data._id;
        skin.type = data.type;

        return (
          <div
            key={skin.name+Date.now}
            className="Main__item-wrapper"
            onClick={() => setSelectedSkin(skin)}
            tabIndex="0"
          >
            <div
              key={index}
              className={`Main__sets-item ${(selectedSkin && selectedSkin.name) === skin.name ? "Main__sets-item--active" : ""}`}
            >
              <LazyLoadImage
                className="img"
                alt={skin.name}
                src={`/asstes/images/placeholders/${skin.placeholder}`}
                width="100%"
                height="100%"
                effect="opacity"
              />
            </div>
            <div className="Main__tooltip">
              {t(`${deviceName}:${skin.name}`)}
            </div>
          </div>
        );
      });

      return (
        <SwiperSlide className="Main__sets-wrapper" key={i+Date.now}>
          {skins}
        </SwiperSlide>
      );
    });
  }

  return (
    <header className="Main">
      <div className="main-head">
        <div className="container">
          <div className="flex aic">
            <button
              className="btn btn__square mr-2"
              onClick={() =>
                history.push(`/categories/skins/${params.category}`)
              }
            >
              <BiChevronLeft className="icon--lg icon--dark" />
            </button>
            <h2 className="heading heading--1 heading--black">
              {t(`nav.${params.category}`)} ~ {deviceName}
            </h2>
          </div>
        </div>
      </div>
      <div className="Main__body">
        <div className="Main__left"></div>
        <div className="Main__right"></div>
        <div className="Main__content">
          <div className="container h-100 flex aic">
            <div className="Main__content-wrapper">
              <div className="Main__right">
                <figure className="Main__figure">
                  {loadingImage ? (
                    <SubSpinner />
                  ) : (
                    <>
                      <img
                        className="Main__img"
                        src={
                          data
                            ? `/images/${data.default}`
                            : `/images/${selectedSkin && selectedSkin.image}`
                        }
                        alt={data ? data.device : (selectedSkin && selectedSkin.name)}
                      />
                    </>
                  )}
                </figure>
                {selectedSkin && (
                  <>
                    <h5 className="text text--mid Main__title">
                      {selectedSkin
                        ? t(`${deviceName}:${selectedSkin.name}`)
                        : t("translation:main.default")}
                    </h5>
                    <div className="Main__right-panel">
                      <button
                        className="btn btn__ghost btn__ghost--active mr-1"
                        onClick={() => setSelectedSkin(null)}
                      >
                        <BiX className="icon" />
                      </button>
                      <button
                        className="btn btn__ghost btn__ghost--active"
                        onClick={() => editFavorites(selectedSkin)}
                      >
                        {isFavorite(selectedSkin._id) ? (
                          <AiFillStar className="Main__icon" />
                        ) : (
                          <AiOutlineStar className="Main__icon" />
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="Main__left">
                <div className="Main__sets">
                  <div className="w-100 pos-rel">
                    {selectedSkin && (
                      <div className="flex aic mb-2">
                        <h5 className="heading heading--sm c-white mr-1">
                          {t(`${deviceName}:${selectedSkin.name}`)}
                        </h5>
                        <span className="mr-1">&bull;</span>
                        <span className="heading heading--sub c-light">
                          {t("translation:main.basic")}
                        </span>
                      </div>
                    )}
                    <div className="pos-rel w-100">
                      <button className="btn__control btn__control--prev Main__btn-control">
                        <BiChevronLeft className="icon--sm" />
                      </button>
                      <button className="btn__control btn__control--next Main__btn-control">
                        <BiChevronRight className="icon--sm" />
                      </button>
                      <Swiper
                        slidesPerView={1}
                        className="Main__sets-body"
                        navigation={{
                          prevEl: ".btn__control--prev",
                          nextEl: ".btn__control--next",
                          disabledClass: "btn__control--disabled",
                        }}
                        spaceBetween={30}
                        updateOnWindowResize={true}
                        onInit={(sw) => setSwiper(sw)}
                      >
                        {skinsSlide}
                      </Swiper>
                    </div>
                  </div>
                  <div className="Main__summary">
                    {selectedSkin && (
                      <div className="Main__price">
                        ${parseFloat(selectedSkin.price).toFixed(2)}
                      </div>
                    )}
                    <button
                      className={`Main__btn ${
                        inTheCart(selectedSkin?._id) ? "Main__btn--active" : ""
                      }`}
                      disabled={selectedSkin ? false : true}
                      onClick={() =>
                        !inTheCart(selectedSkin?._id) && editCart(selectedSkin)
                      }
                    >
                      {inTheCart(selectedSkin?._id) ? (
                        t("translation:main.in the cart")
                      ) : (
                        <>
                          {t("translation:main.to cart")}
                          <BiCartAlt className="icon ml-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Main__footer"></div>
    </header>
  );
};

const state = (state) => ({
  favorites: state.favorites,
  cart: state.cart,
  categories: state.categories,
});

const dispatch = (dispatch) => ({
  onAddToCart: (id) => dispatch(actions.addToCart(id)),
  onSetData: (name, val) => dispatch(actions.setData(name, val)),
});

export default connect(state, dispatch)(Main);

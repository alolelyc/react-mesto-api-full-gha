import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import isRight from "../images/isRight.svg";
import isFalse from "../images/isFalse.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(null);
  const navigate = useNavigate();
  const [popupAnswer, setPopupAnswer] = useState("");
  const [popupName, setPopupName] = useState("");
  const [isToolTip, setIsToolTip] = useState(false);

  function onLogin(email, password) {
    auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setIsEmailUser(email);
        navigate("/");
      })
      .catch(() => {
        setPopupAnswer(isFalse);
        setPopupName("Что-то пошло не так! Попробуйте ещё раз.");
        handleTooltip();
      });
  }

  function onRegister(email, password) {
    auth
      .regUser(email, password)
      .then(() => {
        setPopupAnswer(isRight);
        setPopupName("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch(() => {
        setPopupAnswer(isFalse);
        setPopupName("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleTooltip);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setIsEmailUser(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getProfileInfo(), api.getServerCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })

        .catch((err) => {
          console.log(`Error: ${err}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleClickCard = (card) => {
    setSelectedCard(card);
  };

  function handleTooltip() {
    setIsToolTip(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleDeleteCard(cardId) {
    //.
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(!isLoading);
    api
      .setUserInfo({
        name: name,
        about: about,
      })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(dataAva) {
    setIsLoading(!isLoading);
    api
      .setAvatarInfo(dataAva)
      .then((data) => {
        setCurrentUser({ ...currentUser, avatar: data.link });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(!isLoading);
    api
      .renderCard({
        name: name,
        link: link,
      })
      .then((newCard) => {
        setIsLoading(!isLoading);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsToolTip(false);
  };

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setIsEmailUser(null);
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/sign-in"
            element={
              <>
                <Header title="Регистрация" route="/sign-up" />
                <Login onLogin={onLogin} />
              </>
            }
          />

          <Route
            path="/sign-up"
            element={
              <>
                <Header title="Войти" route="/sign-in" />
                <Register onRegister={onRegister} />
              </>
            }
          />

          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />}
          />

          <Route
            path="/"
            element={
              <>
                <Header
                  title="Выйти"
                  email={isEmailUser}
                  onClick={handleSignOut}
                  route=""
                />
                <ProtectedRoute
                  component={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onClickCard={handleClickCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCard}
                  isLogged={isLoggedIn}
                />
                <Footer />
              </>
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          image={popupAnswer}
          title={popupName}
          isOpen={isToolTip}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

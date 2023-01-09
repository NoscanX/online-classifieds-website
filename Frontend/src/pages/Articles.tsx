import "../styles/articles-styles.css";

const Articles = () => {
  return (
    <div className="main-article-container">
      <div className="article-container-header">
        <h2>Regulamin internetowego serwisu ogłoszeniowego OCW</h2>
        <hr />
      </div>
      <div className="article-container-content">
        <ol>
          <h5>
            <strong>Zasady publikacji Ogłoszeń</strong>
          </h5>
          <li>
            Treść każdego Ogłoszenia powinna spełniać wymogi określone w punkcie
            2 Regulaminu, być zgodna z prawdą, jednoznaczna i zrozumiała oraz
            spełniać wymogi techniczne określone przez Grupę OCW. Użytkownik
            zachowuje swobodę określenia treści Ogłoszenia w granicach prawa i z
            zachowaniem następujących wymogów:
          </li>
          <ol type="a">
            <li>
              Ogłoszenie sporządzone zostanie w języku polskim, nie będzie
              zawierało słów powszechnie uznanych za wulgarne lub obraźliwe;
            </li>
            <li>
              Użytkownik wybierze jedną, właściwą dla Przedmiotu Kategorię i
              podkategorię tematyczną, do której Ogłoszenie powinno zostać
              przypisane;
            </li>
            <li>Użytkownik wskaże cenę końcową w złotych polskich;</li>
            <li>
              Użytkownik wskaże stan Przedmiotu w ramach opisu udostępnionego w
              Serwisie dla Ogłoszeń;
            </li>
            <li>
              treść Ogłoszenia powinna zawierać jasny, dokładny i kompletny opis
              Przedmiotu, zawierający zgodne z prawdą i niewprowadzające w błąd
              informacje co do cech Przedmiotu i warunków Transakcji. Zabronione
              jest przekazywanie tych informacji z pominięciem Serwisu. Treść
              Ogłoszenia stanowią również dodane w ramach niego zdjęcia oraz
              tytuł Ogłoszenia;
            </li>
            <li>jedno Ogłoszenie może dotyczyć jednego Przedmiotu;</li>
            <li>
              ten sam Przedmiot może być w danym czasie objęty tylko jednym
              Ogłoszeniem, przy czym dotyczy to również Ogłoszeń zakończonych
              przez Użytkownika przed upływem 14 dni od daty dodania Ogłoszenia;
            </li>
            <li>
              w treści Ogłoszenia nie można zamieszczać treści takich jak w
              szczególności: reklamy, treści promocyjne i ogłoszeniowe, adresy
              stron internetowych oraz innych elementów prowadzących
              Użytkowników do serwisów świadczących takie same lub podobne
              usługi jak Grupa OLX (tj. serwisów publikujących oferty lub
              ogłoszenia pochodzące od użytkowników sieci Internet).
            </li>
          </ol>
          <h5>
            <strong>
              Bezprawne i niezgodne z Regulaminem działania Użytkowników
            </strong>
          </h5>
          <li>
            Użytkownik uprawniony jest do korzystania z Serwisu zgodnie z jego
            przeznaczeniem, w granicach prawa i dobrych obyczajów obowiązujących
            społeczeństwo informacyjne, z poszanowaniem praw i dóbr innych osób.
            W szczególności, Użytkownik zobowiązuje się do:
          </li>
          <ol type="a">
            <li>
              niepodejmowania działań, które mogłyby zakłócić prawidłowe
              funkcjonowanie Serwisu, w tym do nieingerowania w zawartość
              Serwisu, Konta lub Kont innych Użytkowników, czy też w elementy
              informatyczne Serwisu;
            </li>
            <li>
              niepodejmowania działań bezprawnych, w tym przesyłania lub
              publikowania z wykorzystaniem funkcjonalności Serwisu treści
              naruszających przepisy prawa, dobra osobiste, treści zawierających
              lub rozpowszechniających pornografię dziecięcą lub treści
              terrorystycznych i naruszających cudze prawa własności
              intelektualnej, a także treści o charakterze dyskryminującym lub
              rasistowskim;
            </li>
            <li>
              niewprowadzania osób korzystających z Serwisu w błąd, np. poprzez
              podawanie nieprawdziwych informacji dotyczących Przedmiotu albo
              zatajenie istotnych informacji;
            </li>
            <li>
              powstrzymywania się od działania w złej wierze, od nadużywania
              funkcjonalności Serwisu, korzystania z Serwisu niezgodnie z jego
              przeznaczeniem i wbrew Regulaminowi;
            </li>
            <li>
              niewprowadzanie w błąd Użytkowników co do stanu, cech i elementów
              Przedmiotu oraz innych warunków Transakcji.
            </li>
          </ol>
          <li>
            W przypadku naruszenia zasad polityki serwisu przez Użytkownika,
            Administator ma prawo usunąć jego ogłoszenia lub zablokować jego
            konto. W takim przypadku Administrator jest zobowiązany poinformować
            Użytkownika mailowo o działaniach podjętych wobec jego konta i
            Ogłoszeń, które zamieścił.
          </li>
        </ol>
      </div>
    </div>
  );
};
export default Articles;

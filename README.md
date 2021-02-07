# Server

##### Serwer uruchamiam z folderu backend - poleceniem node start.js
##### Dodałam koa-router
##### Kanały będą wczytywane z pliku channels.json
##### Serwer będzie udostępniał endpointy:
##### '/api/data/unsorted',
##### '/api/data/sortedByTitleAsc'
##### '/api/data/sortedByTitleDesc'
##### '/api/data/sortedBySubscribersAsc'
##### '/api/data/sortedBySubscribersDesc'
##### '/api/data/sortedByVideoCountAsc'
##### '/api/data/sortedByVideoCountDesc'
##### '/api/data/sortedByViewsCountAsc'
##### '/api/data/sortedByViewsCountDesc'
##### z aplikacji frontendowej z folderu frontend lub każdego innego klienta HTTP (przeglądarka, postman) możemy za pomocą   zapytań typu http://localhost:3000/api/data/sortedByTitleAsc dostać listę posortowanych odpowiednio kanałów (w formacie string), która potem na frontendzie zamieniamy na listę obiektów typu json 

# Frontend

##### Zamieniam dane z pól obiektów videoCount, viewCount, subscriberCount  za pomocą funkcji toLocaleString  na notacje imperialną.
##### Dynamicznie tworzę HTML na podstawie listy kanałów jako tablica obiektów typu JSON.
##### Rozmiary obrazków są dynamicznie dopasowywane podczas tworzenia HTML
##### Na event keyup uruchamiam funkcje searchEngine()
##### W zależności jaki jest wybrany radio button oraz co jest wpisane w formularzu wyszukuje odpowiedni element o klasie .box, nie zależnie od małych i dużych liter oraz polskich znaków, Do tego celu zastosowałam funkcje to LowerCase () dla tekstu z inputu oraz tekstu w elemencie o klasie .box oraz funkcje replace(); 
##### Jeśli wyszukiwany element jest zgodny z właściwością elementu o klasie .box wyświetla sie tylko ten element pozostałe nie są wyświetlane.
##### Utworzyłam  eventListner, który nasłuchuje na naciśniecie przycisku sort i w zależności od tego, czy przycisk wcisnęłam pierwszy, czy następny raz , następuje sortowanie rosnąco lub malejąco. Wykonałam to za pomocą togglowania klasy .asc
##### W funkcji sortItems() w zależności od wybranego radio buttonu oraz warunku czy ustawiona jest klasa asc - jeśli jest pobieramy z serwera obiekty posortowane rosnąco, jeśli nie jest malejąco.
##### Utworzyłam  eventListner, który nasłuchuje na naciśniecie przycisku clear - jego naciśnięcie powoduje ustawienie na radio buttonach właściwości checked = false i usuwa wartości inputu (filterInput.value = '';)
##### Następnie usuwana jest cała zawartość section o klasie 'box-list', po czym ładowana na nowo z serwera (nieposortowana kolejność)

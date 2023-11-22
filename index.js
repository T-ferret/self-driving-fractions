import {addData, removeData} from './graph_update.js';
import {turbChart, tempChart} from './water_graph.js';

let map, infoWindow;

// 처음 Maps API를 불러올 때의 설정 초기화
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.5400456, lng: 126.9921017 },
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow();

    // 버튼 만들기
    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    
    // user가 버튼을 클릭했을 때
    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {handleLocationError(true, infoWindow, map.getCenter());}
            );
        } else {
            // Browser doesn't support Geolocation 
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    // 차트 그리기
    

    // // 차트 업데이트
    // const myUpdateButton = document.getElementById("UpdateData");

    // if (myUpdateButton) {
    //     myUpdateButton.addEventListener('click', function () {
    //         addData(LineChart, '5', 4.0);
    //     });
    // } else {
    //     console.error('Data Updating is failed.');
    // }

    // // 차트 과거 데이터 지우기
    // const myRemoveButton = document.getElementById("RemoveData");

    // if (myRemoveButton) {
    //     myRemoveButton.addEventListener('click', function () {
    //         removeData(LineChart);
    //     });
    // } else {
    //     console.error('Data Removing is failed.');
    // }

    // var InsertData = setInterval(addData, 5000, LineChart, '6', 4.7);
    // var DeleteData = setInterval(removeData, 5000, LineChart);

    // const autoButton = document.getElementById("StopAuto");

    // if (autoButton) {
    //     autoButton.addEventListener('click', function() {
    //         setTimeout(function() {
    //             clearInterval(InsertData);
    //             clearInterval(DeleteData);
    //         })
    //     })
    // }

    // 데이터를 추가하고 제거하는 함수
    function updateData(chart, label, data, index, interval) {
        if (index >= label.length - 1) {
            clearInterval(interval);
            // return;
        }
        
        addData(chart, label[index], data[index]);
        removeData(chart);
    }

    // 물의 탁도 데이터 정의
    const turb_labels = ['5', '6', '7', '8'];
    const turb_data = [4.4, 3.8, 5.4, 4.8];
    let turb_index = 0;

    // 5초 간격으로 updateData 함수 호출
    const intervalTurb = setInterval(() => {
        updateData(turbChart, turb_labels, turb_data, turb_index, intervalTurb);
        turb_index++;
    }, 5000);

    // 수온 데이터 정의
    const temp_labels = ['5', '6', '7', '8'];
    const temp_data = [21.7, 22.3, 22.1, 22.8];
    let temp_index = 0;

    // 5초 간격으로 updateData 함수 호출
    const intervalTemp = setInterval(() => {
        updateData(tempChart, temp_labels, temp_data, temp_index, intervalTemp);
        temp_index++;
    }, 5000);

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

window.initMap = initMap;

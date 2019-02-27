import { check, group, sleep } from "k6";
import http from "k6/http";

// Options
export let options = {
    stages: [
        { duration: "60s", target: 10 },
        { duration: "60s" },
        { duration: "60s", target: 0 }
    ],
    thresholds: {
        http_req_duration: ["p(95)<10"]
    },
    ext: {
        loadimpact: {
            name: "test.loadimpact.com"
        }
    }
};

// Scenario
export default function() {
    group("Front page", function() {
        let res = http.get("http://localhost:8090/greeting");
        check(res, {
            "is status 200": (r) => r.status === 200
        });
        sleep(10);
    });
}

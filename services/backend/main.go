package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"
)

const Port = 8000

func main() {
	port := strconv.Itoa(Port)

	handler := http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		var resp []byte
		if req.URL.Path == "/" {
			resp = []byte(`{"status": "ok"}`)
		} else if req.URL.Path == "/version" {
			resp = []byte(`{"version": "1.0.0.0"}`)
		} else if req.URL.Path == "/time" {
			timeInfo := time.Now().Local().UTC()
			resp = []byte(`{"time": "` + timeInfo.In(time.Local).String() + `"}`)
		} else {
			rw.WriteHeader(http.StatusNotFound)
			return
		}

		rw.Header().Set("Content-Type", "application/json")
		rw.Header().Set("Content-Length", fmt.Sprint(len(resp)))
		rw.Write(resp)
	})

	log.Println("Server is available at http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

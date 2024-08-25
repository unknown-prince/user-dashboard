package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
)

const Port = 8000

func main() {
	port := strconv.Itoa(Port)

	handler := http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		resp := []byte(`{"status": "online"}`)
		rw.Header().Set("Content-Type", "application/json")
		rw.Header().Set("Content-Length", fmt.Sprint(len(resp)))
		rw.Write(resp)
	})

	log.Println("Server is available at http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

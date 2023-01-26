package main

import (
	"encoding/json"
	"net/http"

	"github.com/mattermost/mattermost-server/v6/plugin"
)

// ServeHTTP demonstrates a plugin that handles HTTP requests by greeting the world.
func (p *Plugin) ServeHTTP(c *plugin.Context, w http.ResponseWriter, r *http.Request) {
	if r.Header.Get("Mattermost-User-ID") == "" {
		http.Error(w, "not authorized", http.StatusUnauthorized)
		return
	}
	switch r.URL.Path {
	case "/status":
		p.handleStatus(w, r)
	case "/config":
		p.handleConfig(w, r)
	case "/hello":
		p.handleHello(w, r)
	default:
		http.NotFound(w, r)
	}
}

func (p *Plugin) handleStatus(w http.ResponseWriter, r *http.Request) {
	configuration := p.getConfiguration()

	var response = struct {
		Enabled bool `json:"enabled"`
	}{
		Enabled: !configuration.Disabled,
	}

	p.responseJSON(w, response)

}

func (p *Plugin) handleConfig(w http.ResponseWriter, r *http.Request) {
	configuration := p.getConfiguration()
	p.responseJSON(w, configuration)
}

func (p *Plugin) handleHello(w http.ResponseWriter, r *http.Request) {
	if _, err := w.Write([]byte("Hello World!")); err != nil {
		p.API.LogError("Failed to write hello world", "err", err.Error())
	}
}

func (p *Plugin) responseJSON(w http.ResponseWriter, res interface{}) {
	rs, _ := json.Marshal(res)

	w.Header().Set("Content-Type", "application/json")
	if _, err := w.Write(rs); err != nil {
		p.API.LogError("Failed to write status", "err", err.Error())
	}
}

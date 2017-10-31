# get token
curl -X "POST" -H "Authorization: Basic YzUwNTVlYTZkMjY3NGFlYmJhY2U1ZTU5OTMwNTQ0Mjg6NTMzODE4NDZiNGQyNDYyZTkzMjg0ZDlhMTY0YjEwNGU=" -d grant_type=client_credentials https://accounts.spotify.com/api/token;

# get tracks
curl -H "Authorization: Bearer BQDAxsTxKfgFmjbkQIfCaKr_Jikrm-WqBAiwB4LZNYaEB6_Rg3RMEqiFLsBALnovnjY9S30V9xNYhFa1SwAjzg" https://api.spotify.com/v1/users/12171649066/playlists/63et1p7vh9i9yByEGIuDl4/tracks;
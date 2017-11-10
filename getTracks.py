#!/bin/python
import json
import requests
# import re

secret = {	'user_id': '12171649066',
			'playlist_id': '63et1p7vh9i9yByEGIuDl4'}

''' Run getTracks.py to get weekly track data '''
def get_weekly_tracks():
	''' Update weekly track list for Smookify. Returns JSON tracks string '''

	# get token
	r = requests.post('https://accounts.spotify.com/api/token', 
		data={'grant_type': 'client_credentials'}, 
		headers={'Authorization': 'Basic YzUwNTVlYTZkMjY3NGFlYmJhY2U1ZTU5OTMwNTQ0Mjg6NTMzODE4NDZiNGQyNDYyZTkzMjg0ZDlhMTY0YjEwNGU='})

	token_dict = json.loads(r.content)

	# get tracks for this week
	#curl -H "Authorization: Bearer BQDAxsTxKfgFmjbkQIfCaKr_Jikrm-WqBAiwB4LZNYaEB6_Rg3RMEqiFLsBALnovnjY9S30V9xNYhFa1SwAjzg" ;

	p = requests.get('https://api.spotify.com/v1/users/12171649066/playlists/63et1p7vh9i9yByEGIuDl4/tracks',
		headers={'Authorization': '{} {}'.format(token_dict['token_type'], token_dict['access_token'])})

	return p.content

if __name__ == '__main__':
	with open('src/tracks.json', 'w') as f:
		# 	f.write(get_weekly_tracks()
		# weekly_tracks = get_weekly_tracks()

		data = []
		txt = open('week11.txt','r').readlines()
		for i in range(0, len(txt), 4):
			data.append({
				'year': txt[i].strip(), 
				'genre': txt[i+1].strip(),
				'title': txt[i+2].strip(),
				'artist': txt[i+3].strip()
			})
		f.write(json.dumps(data))



#!/bin/python
import json
import requests
# import re

secret = {'client_id': 'c5055ea6d2674aebbace5e5993054428',
			'client_secret': '53381846b4d2462e93284d9a164b104e',
			'user_id': '12171649066',
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


# def find_next_year(start, s):
# 	''' start index, string s '''
# 	s = s[start:]
# 	p = re.search('(\([0-9][0-9]*)\)',s)
# 	return p.group(0).replace('(', '').replace(')', '')


if __name__ == '__main__':
	with open('src/tracks.json', 'w') as f:
		f.write(get_weekly_tracks())
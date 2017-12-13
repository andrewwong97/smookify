#!/bin/python
import json
import string
import requests
from bs4 import BeautifulSoup
import re
import wikipedia
import sys

secret = {'user_id': '12171649066',
          'playlist_id': '63et1p7vh9i9yByEGIuDl4'}

''' Run getTracks.py to get playlist track data '''


def get_spotify_tracks():
    ''' Update weekly track list for Smookify. Returns JSON tracks string '''

    # get token
    r = requests.post('https://accounts.spotify.com/api/token',
                      data={'grant_type': 'client_credentials'},
                      headers={
                          'Authorization': 'Basic YzUwNTVlYTZkMjY3NGFlYmJhY2U1ZTU5OTMwNTQ0Mjg6NTMzODE4NDZiNGQyNDYyZTkzMjg0ZDlhMTY0YjEwNGU='})

    token_dict = json.loads(r.content)

    p = requests.get('https://api.spotify.com/v1/users/12171649066/playlists/160cCIcwQXfhKVxcD4mBiz/tracks',
                     headers={'Authorization': '{} {}'.format(token_dict['token_type'], token_dict['access_token'])},
                     params={'fields': 'items(track(name,album(artists)))'})

    return json.loads(p.content)


def parse_spotify_tracks(tracks=None):
    if not tracks:
        tracks = get_spotify_tracks()

    parsed = {}
    for item in tracks['items']:
        t = item['track']
        try:
            parsed[t['name']] = t['album']['artists'][0]['name']
        except KeyError:
            print 'error on {}'.format(t['name'])
    return parsed


def get_track_details(track, artist):
    # Get year
    try:
        r = requests.get('https://musicbrainz.org/search?query={}+{}&type=release&method=indexed'.format(track.encode('utf8', 'ignore'), artist.encode('utf8', 'ignore')))
        soup = BeautifulSoup(r.content, 'lxml')
        match = soup.find_all('tr')[1]
        year = re.search("[0-9]+", str(match.find_all('td')[5])).group(0)
    except AttributeError:
        year = 'Year Not Found'

    # Get genre
    try:
        w = requests.get('https://en.wikipedia.org/wiki/{}'.format(
            wikipedia.search('{} {} {}'.format(track, artist, year))[0].replace(' ', '_')))
        soupW = BeautifulSoup(w.content, 'lxml')
        infobox = soupW.find_all('table', class_='infobox')[0]

        for row in infobox.find_all('tr'):
            if row.th:
                if 'Music genre' in str(row.th):
                    genre = row.td.get_text().strip().split('\n')[0]
                    for ch in string.punctuation:
                        genre = genre.split(ch)[0]

        return year, genre
    except:
        return year, 'Genre Not Found'


if __name__ == '__main__':
    tracks = parse_spotify_tracks()
    genre_test = []
    try:
        for track, artist in tracks.items():
            year, genre = get_track_details(track, artist)
            json_obj = {'track': track, 'artist': artist, 'year': year, 'genre': genre}
            print str(json_obj).encode('utf8')
            genre_test.append(json_obj)
        with open('./src/genre-test.json', 'w') as f:
            f.write(json.dumps(genre_test))
        print 'success'
    except Exception as e:
        with open('./src/genre-test.json', 'w') as f:
            f.write(json.dumps(genre_test))
        print 'program exited with status 0', e.message
        sys.exit(0)






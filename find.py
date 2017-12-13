import re

def clean_string(s):
	try:
		return s.decode('utf8').encode('utf8', 'ignore').strip()
	except UnicodeEncodeError:
		return s.encode('utf8')


def get_songs_genres():
	s = open('week12.txt','r').read()
	group = re.split(u'[\u201c+\u201d]', s.decode('utf8'), flags=re.UNICODE)

	songs = []
	genres = []
	other = []
	for i in range(len(group)):
		genre = group[i].split('E.g.:')
		if len(genre) > 1:
			g = genre[0].splitlines()
			if len(g) > 1:
				genres.append(clean_string(g[1]))
		else:
			if ';' in group[i]:
				other.append(group[i][group[i].find(';')+1:].strip()) # artists??
			else:
				if '(' not in group[i]:
					songs.append(clean_string(group[i]))
	print genres
	return songs, genres

def get_songs_by_genres():
	s = open('week12.txt','r').read()
	songs, genres = get_songs_genres()

	songs_by_genre = {}
	for i in range(len(genres)-1):
		if genres[i] not in songs_by_genre:
			songs_by_genre[genres[i]] = []

		g_idx_1 = s.find(genres[i])
		g_idx_2 = s.find(genres[i+1])

		for j in songs:
			s_idx = s.find(j)
			if s_idx > g_idx_1 and s_idx < g_idx_2:
				songs_by_genre[genres[i]].append(j)

	if genres[-1] not in songs_by_genre:
		songs_by_genre[genres[-1]] = []
	last_idx = s.find(genres[-1])
	for j in songs:
		if s_idx > last_idx:
			songs_by_genre[genres[-1]].append(j)

	# for k in songs_by_genre:
	# 	print k
	# 	for v in songs_by_genre[k]:
	# 		print v + ' | ', 
	# 	print ''



if __name__ == '__main__':
	get_songs_by_genres()


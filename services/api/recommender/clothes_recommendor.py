import math
import importlib
mymodule = importlib.import_module("recommender.clothes_data")

def euclidean_similarity(person1, person2):

	common_ranked_items = [itm for itm in mymodule.data[person1] if itm in mymodule.data[person2]]
	rankings = [(mymodule.data[person1][itm], mymodule.data[person2][itm]) for itm in common_ranked_items]
	distance = [pow(rank[0] - rank[1], 2) for rank in rankings]

	return 1 / (1 + sum(distance))

def pearson_similarity(person1, person2):

	common_ranked_items = [itm for itm in mymodule.data[person1] if itm in mymodule.data[person2]]

	n = len(common_ranked_items)

	s1 = sum([mymodule.data[person1][item] for item in common_ranked_items])
	s2 = sum([mymodule.data[person2][item] for item in common_ranked_items])

	ss1 = sum([pow(mymodule.data[person1][item], 2) for item in common_ranked_items])
	ss2 = sum([pow(mymodule.data[person2][item], 2) for item in common_ranked_items])

	ps = sum([mymodule.data[person1][item] * mymodule.data[person2][item] for item in common_ranked_items])

	num = n * ps - (s1 * s2)

	den = math.sqrt((n * ss1 - math.pow(s1, 2)) * (n * ss2 - math.pow(s2, 2)))

	return (num / den) if den != 0 else 0



def recommend(person, bound,similarity=pearson_similarity):
	scores = [(similarity(person, other), other) for other in mymodule.data if other != person]

	scores.sort()
	scores.reverse()
	scores = scores[0:bound]

	recomms = {}

	for sim, other in scores:
		ranked = mymodule.data[other]

		for itm in ranked:
			if itm not in mymodule.data[person]:
				weight = sim * ranked[itm]

				if itm in recomms:
					s, weights = recomms[itm]
					recomms[itm] = (s + sim, weights + [weight])
				else:
					recomms[itm] = (sim, [weight])

	for r in recomms:
		sim, item = recomms[r]
		recomms[r] = sum(item) / sim

	return recomms
def recommend_cloth(user="User_4"):
	d=user
	rec=recommend(d,13)
	recom=list()
	for other in rec:
		recom.append(other)
	return recom

#!/usr/bin/python3
""" Flash web app """
from models import storage
from models.state import State
from models.amenity import Amenity
from flask import Flask, render_template
import uuid

app = Flask(__name__)


@app.teardown_appcontext
def close_db(error):
    """ Close db """
    storage.close()


@app.route('/4-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB """
    states = storage.all(State).values()
    states = sorted(states, key=(lambda k: k.name))
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=(lambda k: k.name))])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=(lambda k: k.name))

    return render_template('4-hbnb.html',
                           cache_id=uuid.uuid4(),
                           states=st_ct,
                           amenities=amenities)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

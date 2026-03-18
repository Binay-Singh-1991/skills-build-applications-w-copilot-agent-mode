from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel', members=['Iron Man', 'Captain America', 'Thor', 'Hulk'])
        dc = Team.objects.create(name='DC', members=['Superman', 'Batman', 'Wonder Woman', 'Flash'])

        # Create users
        users = [
            User(email='ironman@marvel.com', name='Iron Man', team='Marvel', is_superhero=True),
            User(email='captain@marvel.com', name='Captain America', team='Marvel', is_superhero=True),
            User(email='thor@marvel.com', name='Thor', team='Marvel', is_superhero=True),
            User(email='hulk@marvel.com', name='Hulk', team='Marvel', is_superhero=True),
            User(email='superman@dc.com', name='Superman', team='DC', is_superhero=True),
            User(email='batman@dc.com', name='Batman', team='DC', is_superhero=True),
            User(email='wonderwoman@dc.com', name='Wonder Woman', team='DC', is_superhero=True),
            User(email='flash@dc.com', name='Flash', team='DC', is_superhero=True),
        ]
        User.objects.bulk_create(users)

        # Create activities
        activities = [
            Activity(user='Iron Man', activity_type='Running', duration=30, date=date.today()),
            Activity(user='Captain America', activity_type='Cycling', duration=45, date=date.today()),
            Activity(user='Thor', activity_type='Swimming', duration=60, date=date.today()),
            Activity(user='Hulk', activity_type='Weightlifting', duration=90, date=date.today()),
            Activity(user='Superman', activity_type='Flying', duration=120, date=date.today()),
            Activity(user='Batman', activity_type='Martial Arts', duration=50, date=date.today()),
            Activity(user='Wonder Woman', activity_type='Archery', duration=40, date=date.today()),
            Activity(user='Flash', activity_type='Sprinting', duration=20, date=date.today()),
        ]
        Activity.objects.bulk_create(activities)

        # Create leaderboard
        Leaderboard.objects.create(team='Marvel', points=225)
        Leaderboard.objects.create(team='DC', points=230)

        # Create workouts
        workouts = [
            Workout(name='Hero Strength', description='Strength training for superheroes.', suggested_for='Marvel'),
            Workout(name='Speed Blitz', description='Speed and agility workout.', suggested_for='DC'),
        ]
        Workout.objects.bulk_create(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))

"""ethicsAdventure URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.urls import path, re_path, include
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView

from backend.views import GameViewSet, UserViewSet, GameSessionAnswerViewSet, RoleTokenObtainPairView, CourseViewSet, ContextHelpViewSet
from django.contrib.auth.models import User

from backend import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename="user")
router.register(r'games', GameViewSet, basename='game')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'contextHelp', ContextHelpViewSet, basename='context_help')

urlpatterns = [
    path('api/openapi/', get_schema_view(
        title="Ethics Adventure",
        description="Documentation for the application APIs"
    ), name='openapi-schema'),
    path('api/docs/', TemplateView.as_view(
        template_name='documentation.html',
        extra_context={'schema_url':'openapi-schema'}
    ), name='swagger-ui'),
    path('api/token/', RoleTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify', TokenVerifyView.as_view(), name='token_verify'),
    path('api/games/toggleActive/', views.toggle_active, name='toggle_active'),
    path('api/games/startSession/', views.start_session, name='start_session'),
    path('api/games/joinGame/', views.joinGame, name='joinGame'),
    path('api/games/endSession/<int:id>/', views.end_session, name='end_session'),
    path('api/gameSession/', views.get_all_game_sessions, name='active_sessions'),
    path('api/gameSession/<int:creator_id>/', views.get_user_sessions, name='user_sessions'),
    path('api/gameSession/answer/', GameSessionAnswerViewSet.as_view({'post':'create'}), name='record_answer'),
    path('api/gameSession/updateAnswer/<int:game_session_answer_id>/', GameSessionAnswerViewSet.as_view({'put': 'update', 'patch': 'update'}), name='update_answer'),
    path('api/gameSession/createAnswer/', GameSessionAnswerViewSet.as_view({'post':'create'}), name='enter_passcode'),
    path('api/teams/createTeam/', views.create_team, name='createTeam'),
    path(r'api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/teams/complete/', views.complete_team, name='completeTeam'),
    path('api/courses/<int:creator_id>/by_creator', views.get_courses_by_creator, name='courses_by_creator_id'),
    path('api/contextHelp/<int:question_id>/by_question', views.get_contexts_by_question, name='get_contexts_by_question'),
    re_path('^api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/games/<int:game_id>/sessions/', views.get_games_sessions),
    path('api/games/<int:game_id>/sessions/<int:session_id>/', views.get_games_session),
    path('api/games/<int:game_id>/sessions/<int:session_id>/report/', views.get_games_session_report),
    path('api/games/<int:game_id>/sessions/<int:session_id>/teams/', views.get_game_session_teams),
    path('api/games/<int:game_id>/sessions/<int:session_id>/teams/<int:team_id>/', views.get_game_session_team),
    path('api/games/<int:game_id>/sessions/<int:session_id>/teams/<int:team_id>/report/', views.get_game_session_team_report)
]


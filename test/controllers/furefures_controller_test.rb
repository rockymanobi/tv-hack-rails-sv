require 'test_helper'

class FurefuresControllerTest < ActionController::TestCase
  setup do
    @furefure = furefures(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:furefures)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create furefure" do
    assert_difference('Furefure.count') do
      post :create, furefure: { at_time_sec: @furefure.at_time_sec, channel_id: @furefure.channel_id, user_id: @furefure.user_id }
    end

    assert_redirected_to furefure_path(assigns(:furefure))
  end

  test "should show furefure" do
    get :show, id: @furefure
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @furefure
    assert_response :success
  end

  test "should update furefure" do
    patch :update, id: @furefure, furefure: { at_time_sec: @furefure.at_time_sec, channel_id: @furefure.channel_id, user_id: @furefure.user_id }
    assert_redirected_to furefure_path(assigns(:furefure))
  end

  test "should destroy furefure" do
    assert_difference('Furefure.count', -1) do
      delete :destroy, id: @furefure
    end

    assert_redirected_to furefures_path
  end
end

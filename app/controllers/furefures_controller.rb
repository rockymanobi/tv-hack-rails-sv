class FurefuresController < ApplicationController
  before_action :set_furefure, only: [:show, :edit, :update, :destroy]

  # GET /furefures
  # GET /furefures.json
  def index
    @furefures = Furefure.all
  end

  # GET /furefures/1
  # GET /furefures/1.json
  def show
  end

  # GET /furefures/new
  def new
    @furefure = Furefure.new
  end

  # GET /furefures/1/edit
  def edit
  end

  # POST /furefures
  # POST /furefures.json
  def create

    headers['Access-Control-Allow-Origin'] = "*"
    param = furefure_params_for_create

    @user = User.find_by( uuid: param["user_uuid"] );
    @channel = Channel.find_by( uuid: param["channel_uuid"] );

    p @user;
    p @channel

    @furefure = Furefure.new( { user: @user, channel: @channel, at_time_sec: param[:at_time_sec] } )

    respond_to do |format|
      if @furefure.save
        format.html { redirect_to @furefure, notice: 'Furefure was successfully created.' }
        format.json { render :show, status: :created, location: @furefure }
      else
        format.html { render :new }
        format.json { render json: @furefure.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /furefures/1
  # PATCH/PUT /furefures/1.json
  def update
    respond_to do |format|
      if @furefure.update(furefure_params)
        format.html { redirect_to @furefure, notice: 'Furefure was successfully updated.' }
        format.json { render :show, status: :ok, location: @furefure }
      else
        format.html { render :edit }
        format.json { render json: @furefure.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /furefures/1
  # DELETE /furefures/1.json
  def destroy
    @furefure.destroy
    respond_to do |format|
      format.html { redirect_to furefures_url, notice: 'Furefure was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_furefure
      @furefure = Furefure.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def furefure_params
      params.require(:furefure).permit(:channel_id, :user_id, :at_time_sec)
    end

    def furefure_params_for_create
      params.require(:furefure).permit(:channel_uuid, :user_uuid, :at_time_sec)
    end
end

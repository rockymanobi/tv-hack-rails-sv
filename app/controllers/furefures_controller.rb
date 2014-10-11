class FurefuresController < ApplicationController
  before_action :set_furefure, only: [:show, :edit, :update, :destroy]

  # GET /furefures
  # GET /furefures.json
  def index
    @furefures = Furefure.all
  end

  def index_for_tv
    channel_uuid = params[:channel_uuid] 
    @furefures = Furefure.joins( :channel ).merge( Channel.uuid_is( channel_uuid ) );
    render json: segmented_data(@furefures)
  end


  def segmented_data( furefures )
    arr = [];
    (3600 / 5).times { |n| 
      arr.push({ segment: (n * 5), vote: 0 });
    }
    furefures.all.each do |furefure|
      target = arr.select { |item| item[:segment] ==  ( (furefure.at_time_sec / 5).floor * 5 ) }[0]
      target[:vote] = target[:vote] + 1
    end

    arr.to_json

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

    def dummy_furefure

      a = [
        { segment: 0, vote: 2},
        { segment: 5, vote: 3},
        { segment: 10, vote: 7},
        { segment: 15, vote: 3},
        { segment: 20, vote: 8},
        { segment: 25, vote: 3},
        { segment: 30, vote: 2},
        { segment: 35, vote: 5},
        { segment: 40, vote: 2},
        { segment: 45, vote: 3},
        { segment: 50, vote: 6},
        { segment: 55, vote: 10},
        { segment: 60, vote: 2},
        { segment: 65, vote: 3},
        { segment: 70, vote: 2},
        { segment: 75, vote: 3},
        { segment: 80, vote: 2},
        { segment: 85, vote: 3},
        { segment: 90, vote: 2},
        { segment: 95, vote: 3},
        { segment: 110, vote: 7},
        { segment: 115, vote: 3},
        { segment: 120, vote: 8},
        { segment: 125, vote: 3},
        { segment: 130, vote: 2},
        { segment: 135, vote: 5},
        { segment: 140, vote: 2},
        { segment: 145, vote: 3},
        { segment: 150, vote: 6},
        { segment: 155, vote: 10},
        { segment: 160, vote: 2},
        { segment: 165, vote: 3},
        { segment: 170, vote: 2},
        { segment: 175, vote: 3},
        { segment: 180, vote: 2},
        { segment: 185, vote: 3},
        { segment: 190, vote: 2},
        { segment: 195, vote: 3},
      ]

      a.to_json


    end
end

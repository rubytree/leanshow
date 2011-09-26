require "rubygems"
require "fssm"

task :compile do
  Dir::mkdir('static') unless File::directory? 'static'
  Dir['*.haml'].each do |r|
    puts `haml -f html5 ./#{r} > ./static/#{r.gsub'haml','html'}`
  end

  Dir::mkdir("static/style") unless File::directory? "static/style"
  Dir['style/sass/*.sass'].each do |r|
    puts `sass #{r} > static/#{r.sub('sass/','').gsub'sass$','css'} `
    puts "sass #{r} > static/#{r.sub('sass/','').gsub'sass','css'} "
  end

  Dir::mkdir("static/script") unless File::directory? "static/script"
  Dir['script/*.coffee'].each do |r|
    puts `coffee -o static/script/ -c #{r}`
  end
end

task :watch do 
  FSSM.monitor do 
    path '.' do 
      glob '*.haml'
      update do |b,r| 
        Dir::mkdir("#{b}/static") unless File::directory? "#{b}/static"
        t = `haml -f html5 #{b}/#{r} > #{b}/static/#{r.gsub'haml','html'}`
        if t =~ /error/
          puts "haml error in #{r}"
        else
          puts "#{r} haml updated"
        end
      end
    end

    path 'style/sass' do 
      glob '*.sass'
      update do |b,r| 
        Dir::mkdir("#{b}/../../static/style") unless File::directory? "#{b}/../../static/style"
        t = `sass #{b}/#{r} > #{b}/../../static/style/#{r.gsub'sass','css'} `
        if t =~ /error/
          puts "sass error in #{r}"
        else
          puts "#{r} sass updated"
        end
      end
    end

    path 'script' do 
      glob '*.coffee'
      update do |b,r| 
        Dir::mkdir("#{b}/../static/script") unless File::directory? "#{b}/../static/script"
        t = `coffee -o #{b}/../static/script -c #{b}/#{r}`
        if t =~ /Error/
          puts "coffe error in #{r}"
        else
          puts "#{r} coffe updated"
        end
      end
    end
  end
  
end
